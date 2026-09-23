# scene-nova

[![npm version](https://img.shields.io/npm/v/scene-nova)](https://www.npmjs.com/package/scene-nova)
[![CI](https://github.com/qq2210219313/scene-nova/actions/workflows/ci.yml/badge.svg)](https://github.com/qq2210219313/scene-nova/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

ThreeNova 是一个基于 Three.js 构建的轻量级 Web 3D SDK，旨在对 Three.js 常用能力进行模块化封装，并提供更简单、统一的三维内容构建与场景管理方式。项目围绕场景、相机、渲染、基础对象工厂、三维对象构建等核心能力展开，在保留 Three.js 原生扩展能力的同时，降低常见 Web 3D 场景的开发成本。

源码按职责划分为 **Scene、Camera、Render、Factory、Builder、Engine、Utils** 七个模块，分别位于 `src/` 下的同名目录，并由 `src/index.ts` 统一导出（详见[模块架构](#模块架构)）。

> **状态：骨架阶段。** 工程化设施与模块骨架已就绪，API 尚未实现。

## 安装

```bash
npm install scene-nova three
```

`three` 是 peerDependency，不会被自动安装。

## 使用

```ts
// TODO: 模块 API 实现后补充使用示例
// import { Engine, Scene, Camera } from "scene-nova";
```

## 模块架构

源码按职责划分为以下七个模块，每个模块对应 `src/` 下的同名目录：

| 模块              | 目录           | 职责                                     | 状态   |
| ----------------- | -------------- | ---------------------------------------- | ------ |
| `Scene`（场景）   | `src/scene/`   | 场景的创建、配置与管理                   | 待实现 |
| `Camera`（相机）  | `src/camera/`  | 相机封装与视角控制                       | 待实现 |
| `Render`（渲染）  | `src/render/`  | 渲染器封装、渲染循环与画面输出           | 待实现 |
| `Factory`（工厂） | `src/factory/` | 基础对象工厂（几何体、材质、灯光等）     | 待实现 |
| `Builder`（构建） | `src/builder/` | 三维对象与场景的构建能力                 | 待实现 |
| `Engine`（引擎）  | `src/engine/`  | SDK 入口：初始化、生命周期管理与模块编排 | 待实现 |
| `Utils`（工具）   | `src/utils/`   | 通用工具函数                             | 待实现 |

所有模块的公共 API 均由 `src/index.ts` 统一对外导出。

## 开发指南

### 环境要求

- Node.js >= 22.12
- npm

### 常用命令

| 命令                    | 说明                              |
| ----------------------- | --------------------------------- |
| `npm run dev`           | 监听模式构建（本地库开发）        |
| `npm run build`         | 构建 ESM 产物与类型声明到 `dist/` |
| `npm test`              | 运行单元测试（Vitest）            |
| `npm run test:watch`    | 监听模式运行测试                  |
| `npm run test:coverage` | 生成测试覆盖率报告                |
| `npm run typecheck`     | TypeScript 类型检查               |
| `npm run lint`          | ESLint 检查（含类型感知规则）     |
| `npm run format`        | Prettier 格式化全部文件           |
| `npm run check:package` | publint 校验产物与 `exports` 配置 |

### 目录结构

| 路径                 | 说明                                                                           |
| -------------------- | ------------------------------------------------------------------------------ |
| `src/`               | 源码；按模块划分目录（见[模块架构](#模块架构)），`src/index.ts` 是唯一公共入口 |
| `tests/`             | 单元测试                                                                       |
| `dist/`              | 构建产物（不提交 Git、不手工修改）                                             |
| `.changeset/`        | 版本变更记录                                                                   |
| `.github/workflows/` | CI 与发布工作流                                                                |

## 版本管理与发布

本项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本号与 CHANGELOG：

1. 完成一次改动后运行 `npx changeset`，选择 bump 类型（patch / minor / major）并描述变更；
2. 将改动与生成的 changeset 文件一并提交，合并到 `main` 分支；
3. CI 会自动创建 Release PR（更新 `version` 与 `CHANGELOG.md`）；
4. 合并 Release PR 后，CI 自动构建并发布到 npm（同时创建 GitHub Release）。

### 首次发布前

- 在 [npm](https://www.npmjs.com/) 创建包并完成账号配置；
- 在仓库 `Settings → Secrets and variables → Actions` 中配置 `NPM_TOKEN`，或在 npm 包设置中启用 **Trusted Publishing（OIDC）**（无需 Token，推荐）。

## License

[MIT](./LICENSE)
