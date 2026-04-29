import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/nn-web-components/",
  description: "Small Web Components by @nekobato.",
  head: [
    ["meta", { content: "#07110d", name: "theme-color" }],
    [
      "link",
      {
        href: "/nn-web-components/favicon.svg",
        rel: "icon",
        type: "image/svg+xml",
      },
    ],
  ],
  lang: "ja-JP",
  lastUpdated: true,
  title: "nnwc",
  themeConfig: {
    docFooter: {
      next: "次のページ",
      prev: "前のページ",
    },
    footer: {
      copyright: "Copyright 2026 nekobato",
      message: "Released under the MIT License.",
    },
    nav: [
      { link: "/", text: "Home" },
      { link: "/nnc-e-display", text: "nnc-e-display" },
    ],
    outline: {
      label: "このページ",
      level: [2, 3],
    },
    search: {
      provider: "local",
    },
    sidebar: [
      {
        items: [{ link: "/nnc-e-display", text: "nnc-e-display" }],
        text: "Components",
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/nekobato/nn-web-components",
      },
    ],
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("nnc-"),
      },
    },
  },
});
