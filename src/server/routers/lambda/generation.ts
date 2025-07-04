import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { AsyncTaskModel } from '@/database/models/asyncTask';
import { GenerationModel } from '@/database/models/generation';
import { authedProcedure, router } from '@/libs/trpc/lambda';
import { serverDatabase } from '@/libs/trpc/lambda/middleware';
import { FileService } from '@/server/services/file';
import { AsyncTaskError, AsyncTaskStatus } from '@/types/asyncTask';
import { Generation } from '@/types/generation';

const generationProcedure = authedProcedure.use(serverDatabase).use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      asyncTaskModel: new AsyncTaskModel(ctx.serverDB, ctx.userId),
      generationModel: new GenerationModel(ctx.serverDB, ctx.userId),
      fileService: new FileService(ctx.serverDB, ctx.userId),
    },
  });
});

export type GetGenerationStatusResult = {
  status: AsyncTaskStatus;
  generation: Generation | null;
  error: AsyncTaskError | null;
};

export const generationRouter = router({
  getGenerationStatus: generationProcedure
    .input(z.object({ generationId: z.string(), asyncTaskId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Check for timeout tasks before querying
      await ctx.asyncTaskModel.checkTimeoutTasks([input.asyncTaskId]);

      const asyncTask = await ctx.asyncTaskModel.findById(input.asyncTaskId);
      if (!asyncTask) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Async task not found' });
      }

      const { status, error } = asyncTask;
      const result: GetGenerationStatusResult = {
        status: status as AsyncTaskStatus,
        generation: null,
        error: null,
      };

      if (asyncTask.status === AsyncTaskStatus.Success) {
        const generation = await ctx.generationModel.findByIdAndTransform(input.generationId);
        if (!generation) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Generation not found' });
        }

        result.generation = generation;
      } else if (asyncTask.status === AsyncTaskStatus.Error) {
        result.error = error as AsyncTaskError;
      }

      return result;
    }),

  deleteGeneration: generationProcedure
    .input(z.object({ generationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Delete the generation from database and get the deleted data
      const deletedGeneration = await ctx.generationModel.delete(input.generationId);

      if (!deletedGeneration) return;

      // If generation had a thumbnail, delete it from S3
      // Note: Don't delete the main url as it's referenced by the file table, delete the related file will
      // auto delete the file from s3
      if (deletedGeneration.asset) {
        const asset = deletedGeneration.asset as any;

        // Only delete thumbnail URL if exists
        if (asset.thumbnailUrl) {
          await ctx.fileService.deleteFile(asset.thumbnailUrl);
        }
      }

      return deletedGeneration;
    }),
});

export type GenerationRouter = typeof generationRouter;
