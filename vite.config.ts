import { fileURLToPath } from "node:url";

import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    // 生成 .d.ts 类型声明，随 npm 包一同发布
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  build: {
    target: "es2023",
    sourcemap: true,
    // 库代码不压缩，由使用方的打包器决定是否压缩
    minify: false,
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      // three 是 peerDependency，由使用方提供，不打包进产物
      external: [/^three(\/.*)?$/],
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // 骨架阶段允许暂时没有测试文件
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.ts"],
    },
  },
});
