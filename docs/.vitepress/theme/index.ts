import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import NncEDisplayDemo from "./components/NncEDisplayDemo.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    if (typeof window !== "undefined") {
      void import("../../../src/index").then(({ defineNncEDisplay }) => {
        defineNncEDisplay();
      });
    }

    app.component("NncEDisplayDemo", NncEDisplayDemo);
  },
} satisfies Theme;
