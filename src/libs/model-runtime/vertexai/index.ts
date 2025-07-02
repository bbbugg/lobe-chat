import { GoogleGenAI, GoogleGenAIOptions } from '@google/genai';

import { safeParseJSON } from '@/utils/safeParseJSON';

import { AgentRuntimeErrorType } from '../error';
import { LobeGoogleAI } from '../google';
import { AgentRuntimeError } from '../utils/createError';

const DEFAULT_VERTEXAI_LOCATION = 'us-central1';

export class LobeVertexAI extends LobeGoogleAI {
  static initFromVertexAI(params?: GoogleGenAIOptions & { apiKey?: string }) {
    try {
      const location = params?.location ?? DEFAULT_VERTEXAI_LOCATION;
      const vertexKey = safeParseJSON(params?.apiKey);
      const projectId = vertexKey?.project_id;
      const client = new GoogleGenAI({
        ...params,
        location, // @google/genai 不传 location 会报错
        vertexai: true,
      });

      return new LobeGoogleAI({
        apiKey: vertexKey,
        client,
        isVertexAi: true,
        location,
        projectId,
      });
    } catch (e) {
      const err = e as Error;

      if (err.name === 'IllegalArgumentError') {
        throw AgentRuntimeError.createError(AgentRuntimeErrorType.InvalidVertexCredentials, {
          message: err.message,
        });
      }

      throw e;
    }
  }
}