# 模块架构

源码按职责划分为以下七个模块，分别位于 `src/` 下的同名目录，由 `src/index.ts` 统一导出：

| 模块              | 目录           | 职责                                                                  | 状态   |
| ----------------- | -------------- | --------------------------------------------------------------------- | ------ |
| `Scene`（场景）   | `src/scene/`   | 管理三维环境：环境贴图、背景（图片/颜色）、雾（含距离雾）、覆盖材质等 | 已实现 |
| `Camera`（相机）  | `src/camera/`  | 相机类的封装与控制                                                    | 待实现 |
| `Render`（渲染）  | `src/render/`  | 渲染器相关：渲染器封装、渲染循环与画面输出                            | 待实现 |
| `Factory`（工厂） | `src/factory/` | 对 Three.js 绘制类做二次简化封装，参数与返回值保持原生一致            | 待实现 |
| `Builder`（构建） | `src/builder/` | 三维对象与场景的构建能力                                              | 暂缓   |
| `Engine`（引擎）  | `src/engine/`  | SDK 入口：初始化、生命周期管理与模块编排                              | 暂缓   |
| `Utils`（工具）   | `src/utils/`   | 公共工具函数，如数据转换等                                            | 待实现 |

Factory 的调用风格示例：

```ts
// 原 Three.js 写法
new THREE.BoxGeometry(width, height, depth);

// scene-nova 写法（入参、返回值均为 Three.js 原生类型）
factory.geometry.box(width, height, depth);
```

> 具体 API 设计将在实现阶段确定，所有对外 API 均由 `src/index.ts` 统一导出。
