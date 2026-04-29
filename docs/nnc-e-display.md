---
description: HTML に貼るだけで使える電光掲示板 Web Component。
title: nnc-e-display
---

# nnc-e-display

`<nnc-e-display>` は、テキストを横流しする Web Component です。`label`
attribute で短い告知を指定でき、より細かく中身を組みたい場合は slot
を使えます。内部実装は `LitElement` ベースです。

<NncEDisplayDemo />

## Quick Start

npm package として導入する場合は、entry を import すると custom element
が登録されます。

```sh
npm install @nekobato/nnwc
```

```ts
import "@nekobato/nnwc/nnc-e-display";
```

```html
<nnc-e-display label="まもなく 1 番線に 快速が到着します"></nnc-e-display>
```

script URL で配布する場合も、HTML へ貼り付けるだけで使える形を想定しています。
パッケージ公開後は CDN の URL を固定できます。

```html
<script
  type="module"
  src="https://unpkg.com/@nekobato/nnwc/dist/nnc-e-display.js"
></script>

<nnc-e-display label="本日の営業時間は 20:00 までです"></nnc-e-display>
```

## API

### Attributes

| Name        | Type                | Default  | Description                         |
| ----------- | ------------------- | -------- | ----------------------------------- |
| `label`     | `string`            | `''`     | slot が空のときに表示するテキスト。 |
| `direction` | `'left' \| 'right'` | `'left'` | テキストが流れる方向。              |
| `speed`     | `number`            | `200`    | 1 秒に何 px 進むかを表す速度。      |

### Slot

slot と `label` を併用した場合、slot の内容が表示されます。

```html
<nnc-e-display label="fallback">
  <strong>ただいまイベント開催中です</strong>
</nnc-e-display>
```

### CSS Custom Properties

見た目やレイアウトは `--nnc-e-display-*` で上書きできます。

| Custom Property                  | Default                         |
| -------------------------------- | ------------------------------- |
| `--nnc-e-display-background`     | `#07110d`                       |
| `--nnc-e-display-color`          | `#ffd45a`                       |
| `--nnc-e-display-border-color`   | `#245947`                       |
| `--nnc-e-display-height`         | `76px`                          |
| `--nnc-e-display-padding-inline` | `24px`                          |
| `--nnc-e-display-font-family`    | Japanese UI font stack          |
| `--nnc-e-display-font-size`      | `2rem`                          |
| `--nnc-e-display-font-weight`    | `700`                           |
| `--nnc-e-display-radius`         | `6px`                           |
| `--nnc-e-display-shadow`         | `0 18px 48px rgb(0 0 0 / 32%)`  |
| `--nnc-e-display-dot-size`       | `1px`                           |
| `--nnc-e-display-dot-gap`        | `5px`                           |
| `--nnc-e-display-glow`           | `0 0 7px rgb(255 212 90 / 72%)` |

```html
<nnc-e-display
  label="次のプログラムは 14:30 から始まります"
  style="
    --nnc-e-display-background: #101827;
    --nnc-e-display-color: #7dd3fc;
    --nnc-e-display-border-color: #38bdf8;
  "
></nnc-e-display>
```

## Behavior

- `speed` は `px/second` として扱います。
- CSS animation を使い、`prefers-reduced-motion: reduce` では停止表示にします。
- slot が空なら `label` を表示し、slot がある場合は slot を優先します。
- 不正な `direction` は `'left'`、不正な `speed` は `200` に戻します。
