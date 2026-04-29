# nnwc - nekobato no Web Components

A collection of Web Components by @nekobato.

## Installation

```sh
npm install @nekobato/nnwc
```

## Usage

Import the package root to register every component.

```ts
import "@nekobato/nnwc";
```

Import a component subpath to register only that component.

```ts
import "@nekobato/nnwc/nnc-e-display";
```

```html
<nnc-e-display label="まもなく 1 番線に 快速が到着します"></nnc-e-display>
```

## Components

- `nnc-e-display`: A Lit-based Japanese train-sign inspired marquee display.

## Development

```sh
npm install
npm run docs:dev
```

## Quality Checks

```sh
npm test
npm run lint
npm run typecheck
npm run format
npm run build
npm run docs:build
```

## Release

Before publishing, run the release check.

```sh
npm run release:check
```

The package is configured with `publishConfig.access` set to `public`.
Publish with an npm account that has access to the `@nekobato` scope.

```sh
npm publish
```

## GitHub Pages

The VitePress site is configured with `base: "/nn-web-components/"`.
GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`.
