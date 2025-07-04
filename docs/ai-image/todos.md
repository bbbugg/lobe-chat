- [x] 增加 ai 绘画 tab 和 image 页面
- [x] 增加 image 的 store
  - [x] generationConfig slice
  - [x] generationConfig topic slice
- [x] 增加左侧的配置面板
  - [x] 选择 fal 和 flux-schnell 作为默认 provider 和 model
  - [x] 增加 model select, 过滤出 type 为 image 的 model
  - [x] 从 model 的 parameters 中解析出其它标准参数
  - [x] 封装 useGenerationConfigParam hook, 可以更方便容易获取某个参数的值和约束
  - [x] 封装 isSupportParam selector, 可以更方便容易判断某个参数是否支持
  - [x] 实现其它这次上线要支持的参数如 seed, steps 等
- [x] 右侧 generationTopics 列表
  - [x] 简单实现中间下方的 prompt 输入框，点击创建的图标回调先置空
  - [x] 增加文档中叙述的一些列数据库表，generationTopics, generationBatches 等
  - [x] 实现查询 generationTopics 的 model, service, 和 generationTopics slice 的 action
  - [x] 使用 suspense实现 generationTopics 的骨架屏渲染
  - [x] 实现创建 generationTopic 的 action, service, model
  - [x] 实现更新 generationTopic 的 action, service, model
  - [x] 使用 fetchPresetTaskResult 实现从用户输入的 prompt 总结出 generationTopic title, 并更新 generationTopic
  - [x] 实现删除 generationTopic 的 action, service, model 以及对应列表项上的删除按钮和功能
- [x] model runtime 扩展接口增加 createImage, 规范好入参和返回值
- [x] 在 fal 的 provider runtime 中实现 createImage 接口
- [x] 创建 image service 和 image lambda router, 在 image service 中调用 lambda router 的 createImage 接口
- [x] 在 image lambda 中实现任务派发逻辑
  - [x] 获取传入的 generationTopicId, 并以此创建 generationBatch
  - [x] 一期先固定每次生成 4 张，创建 4 个 generations
  - [x] 为每个 generation 创建 pending 状态的 asyncTask
  - [x] 创建 async image router
  - [x] 并发触发 async image router 中的任务
- [x] 在 async image router 中实现核心生图逻辑
  - [x] 在其中调用 model runtime 的 createImage 接口
  - [x] 生图结束上传图片到 s3
  - [x] 生成缩略图
  - [x] 更新 generation 的 asset 和 asyncTask status
- [ ] **实现 中间的 generation feed**

  - [x] **数据层**:
    - [x] DB Model: 实现 `generationBatch` 的 model
    - [x] DB Repository: 实现 `generationFeed` repository，用于获取 `GenerationBatch` 及其关联的 `Generation` 列表
  - [x] **服务层**:
    - [x] Service: 实现 `generationBatch` service，调用 repository
    - [x] API: 在 tRPC router 中新增 `getGenerationBatches` 接口
  - [x] **前端**:
    - [x] Types: 在 `src/types/generation` 中定义前端所需的 `Generation` 和 `GenerationBatch` 类型
    - [x] Zustand Slice: 创建 `generation` 和 `generationBatch` 两个 slice
      - [ ] `generationBatch` slice 包含 `generationBatchesMap` 和 SWR hook for data fetching
    - [x] Component: 实现 `GenerationFeed` 组件
      - [x] 实现 `GenerationFeed` 的骨架屏组件 `Skeleton`
      - [x] 实现 `GenerationFeed` 的内容渲染组件 `List` 和 `BatchItem`
      - [x] 在 `GenerationFeed/index.tsx` 中使用 `Suspense` 和 `lazy` 组合 `Skeleton` 和 `List`
      - [x] 在 `List` 组件中调用 zustand action 获取并渲染数据

- [ ] 生成状态轮训
- [ ] 上传到 oss
- [ ] 缩略图的生成
- [ ] seed 支持
- [ ] reuse settings 支持
- [ ] 图片上传支持
- [ ] gp4-image-1 支持
