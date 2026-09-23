import { fileURLToPath } from "node:url";

import { defineConfig } from "vitepress";

// 部署到 GitHub Pages 等子路径时，请设置 base（例如 "/scene-nova/"）
export default defineConfig({
  lang: "zh-CN",
  title: "scene-nova",
  description: "基于 Three.js 的轻量级 Web 3D SDK",
  cleanUrls: true,
  head: [["meta", { name: "theme-color", content: "#4f8cff" }]],
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "示例", link: "/demos/basic-scene" },
      { text: "GitHub", link: "https://github.com/qq2210219313/scene-nova" },
    ],
    sidebar: [
      {
        text: "指南",
        items: [
          { text: "快速开始", link: "/guide/getting-started" },
          { text: "模块架构", link: "/guide/modules" },
        ],
      },
      {
        text: "示例",
        items: [{ text: "基础场景", link: "/demos/basic-scene" }],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/qq2210219313/scene-nova" }],
    editLink: {
      pattern: "https://github.com/qq2210219313/scene-nova/edit/main/examples/:path",
      text: "在 GitHub 上编辑此页",
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: "Copyright © 2026 qq2210219313",
    },
  },
  vite: {
    resolve: {
      alias: {
        // 直接指向库源码：示例与文档始终使用最新的库代码，无需先构建
        "scene-nova": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
});
