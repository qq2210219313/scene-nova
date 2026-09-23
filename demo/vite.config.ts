import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      // 直接指向库源码：修改 src/ 后此处立即热更新，无需先构建库
      "scene-nova": fileURLToPath(new URL("../src", import.meta.url)),
    },
  },
});
