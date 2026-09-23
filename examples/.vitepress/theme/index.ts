import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import SceneDemo from "./components/SceneDemo.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册示例组件，便于在 Markdown 中直接使用
    app.component("SceneDemo", SceneDemo);
  },
} satisfies Theme;
