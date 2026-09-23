# 快速开始

> **状态：骨架阶段。** scene-nova 的模块 API 尚未实现，本页先介绍接入方式，API 就绪后会补充完整示例。

## 安装

```bash
npm install scene-nova three
```

`three` 是 scene-nova 的 peerDependency，需要在使用方项目中自行安装。

## 引入

```ts
// TODO: 模块 API 实现后补充示例
// import { Engine, Scene, Camera } from "scene-nova";
```

## 本地开发

克隆仓库后，使用以下命令开始开发：

| 命令                | 说明                               |
| ------------------- | ---------------------------------- |
| `npm install`       | 安装所有依赖（含 demo / examples） |
| `npm run demo`      | 启动开发沙盒                       |
| `npm run examples`  | 启动本演示与文档站                 |
| `npm run build`     | 构建库产物到 `dist/`               |
| `npm test`          | 运行单元测试                       |
| `npm run lint`      | 代码检查（含类型感知规则）         |
| `npm run typecheck` | TypeScript 类型检查                |
| `npm run format`    | Prettier 格式化                    |

完整的工程说明见仓库 README。
