# WebComponent 電光掲示板

HTML に貼るだけで使える電光掲示板コンポーネントです。テキストを軽快に横流しし、配信やサイネージでの告知に向きます。

- 概要: テキストを横流し表示する電光掲示板コンポーネント。
- 実現性: High
- 規模感: S
- 概算: 1–2 日
- 計画ステータス: 文書化は完了。残項目は実装しながら確認する

## MVP スコープ案

- `<nnc-e-display>` の MVP API:
  - `label?: string`
  - `direction?: 'right' | 'left' = 'left'`
  - `speed?: number = 200`
  - slot 対応
- `speed` は「1 秒に何 px 進むか」を表す
- 見た目やレイアウトに関わる値は、ひとまずすべて `--nnc-e-display-*` の CSS variables で上書きできるようにする

## 現時点の決定事項

- 配布形態:
  - `npm package` と `script URL` の両対応にする
- API の考え方:
  - 中身をカスタムしたい場合は slot を使う
  - 単純な文字列指定でよい場合は `label` attribute を使う
  - `direction` は `'left' | 'right'` を持ち、既定値は `'left'`
  - `speed` は number とし、既定値は `200`
  - `speed` の単位は「1 秒に何 px 進むか」にする
  - slot と `label` を併用した場合は slot を優先する
  - 見た目やレイアウトに関わる値は、ひとまずすべて `CSS variables` に寄せる
  - 変数名は `--nnc-e-display-*` に統一する
  - color や font-size のような appearance 系は `HTML attributes` に持たせない
- アニメーション:
  - まずは CSS animation で成立する構成を優先する
  - CSS animation だけで足りるかどうかは、実装してから確認する
- 利用シーン:
  - OBS 専用ではなく、一般的な Web サイトへの埋め込み利用を主に想定する
- docs / demo:
  - `VitePress` 上で `code + preview` を基本構成にする
  - 独立した controls panel は初期版では置かない

## MVP の成功条件

- ここでいう「成功条件」は、`MVP としてできたと言える最低条件` のこと
- `<nnc-e-display>` を HTML に貼るだけで、日本の電車の電光掲示板のような見た目で文章が横流しになる
- `label` と slot のどちらでも文言を流せる
- `direction` と `speed` を変更すると挙動が変わる
- 見た目やレイアウトに関わる値を `--nnc-e-display-*` の CSS variables で調整できる
- preview ページで、シンプルな実例と最小コードを並べて確認できる

## 実装時の確認事項

- `--nnc-e-display-*` の変数セットをどこまで初期公開するか
- CSS animation だけで不足する表現が出るかどうか

## MVP の実装方針

1. まず `<nnc-e-display>` の public API を小さく固定する
2. 初期 API は `label` `direction` `speed` を中心にし、見た目やレイアウトは `--nnc-e-display-*` の CSS variables で調整できる形を優先する
3. web の docs / demo サイトは `VitePress` で構築する
4. コンポーネントの紹介ページは docs 兼 demo ページとして作り、日本の電車の電光掲示板を模した単純な preview を 1 つ置く
5. `VitePress` の Markdown ページ内に preview 用コンポーネントを埋め込み、`code + preview` の最小構成で見せる
6. ページ上では preview と最小コードを並べ、導入方法と CSS variables の使い方がひと目で分かるようにする
7. 初期版では用途別プリセットは持たず、まず 1 つの完成度の高い preview に絞る
8. API の説明は props / slot / CSS カスタムプロパティを中心に短く整理し、販売や配布ページとしても流用しやすくする

## preview ページの構成メモ

- `VitePress` の役割:
  - docs site 本体を構築する
  - Markdown ベースで説明を書く
  - 必要なページだけ Vue component を差し込み、simple な preview を載せる
- 最小 UI:
  - 日本の電車の電光掲示板を模した preview
  - 最小コード表示
- 最初はフル IDE ではなく、`code + preview` だけの構成から始める
- slider や color picker などの専用 controls は初期版では持たせない

## 技術メモ

- `VitePress` は Markdown の中で Vue components を使えるので、docs と live preview を同じページにまとめやすい
- preview は日本の電車の電光掲示板らしい配色、余白、ドット感を先に作り込み、用途展開はその後で考える
- アニメーションはまず CSS animation で組み、実装後に不足が見えた場合だけ別案を検討する
- 将来、props 数が増えたらプリセット切り替え UI や専用 controls を足し、コード編集なしでも試せる導線を追加する

## ビジネス検討（小規模成立性）

- 成立性: Yes（配信素材/店頭デモ/イベントで需要）
- ターゲット: 配信者/店舗 POP/イベント運営
- 収益: コンポーネント+テーマ販売、商用ライセンス
- 価格帯: 個別 1,000 円、バンドル 3,000–5,000 円、商用 5,000 円〜
- 獲得: Booth/Gumroad、テンプレ配布 → 上位版販売
- 維持コスト: 低
- KPI: テーマ DL 数、商用ライセンス販売比率
- リスク: 無料 CSS/JS 代替あり → 品質/操作 UI で差別化

## 類似サービス（2026-03-31 時点）

- react-fast-marquee https://www.npmjs.com/package/react-fast-marquee
  - 概要：React 向けの軽量なマルキー実装。
  - アイデアとの差異：React 前提で、素の HTML に貼るだけの Web Components ではない。
- jQuery.Marquee https://github.com/aamirafridi/jQuery.Marquee
  - 概要：古くから使われている jQuery ベースのスクロール表示プラグイン。
  - アイデアとの差異：依存が重く、モダンなカスタム要素として再利用する方向とは異なる。
- TradingView Ticker Tape https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/
  - 概要：金融情報を横流し表示する埋め込みウィジェット。
  - アイデアとの差異：特定用途向けで、汎用テキストや配信テロップに自由に使うことは想定されていない。
- Yodeck https://www.yodeck.com/
  - 概要：デジタルサイネージ向けにスクロールテキストを扱える SaaS。
  - アイデアとの差異：サイネージ運用基盤であり、部品として組み込む軽量コンポーネントではない。
