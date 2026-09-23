# 快速开始

> **状态：开发中。** Scene 模块已提供初版 API，其余模块实现后会补充完整示例。

## 安装

```bash
npm install scene-nova three
```

`three` 是 scene-nova 的 peerDependency，需要在使用方项目中自行安装。

## 引入

```ts
import { Scene } from "scene-nova";

// 创建场景并管理三维环境
const scene = new Scene();
scene.setBackground("#0b0e14");
scene.setFog({ color: "#0b0e14", near: 10, far: 100 });
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
