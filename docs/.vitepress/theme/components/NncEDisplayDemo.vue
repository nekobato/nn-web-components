<script setup lang="ts">
const primaryCode =
  '<nnc-e-display label="まもなく 1 番線に 快速 渋谷行きが到着します"></nnc-e-display>';

const examples = [
  {
    code: primaryCode,
    direction: "left",
    label: "まもなく 1 番線に 快速 渋谷行きが到着します",
    speed: 160,
    title: "Label Attribute",
  },
  {
    code: '<nnc-e-display direction="right" speed="120">ただいまイベント開催中です</nnc-e-display>',
    direction: "right",
    label: "ただいまイベント開催中です",
    speed: 120,
    title: "Slot Content",
  },
] as const;
</script>

<template>
  <section class="nnc-demo" aria-labelledby="nnc-demo-title">
    <div class="nnc-demo__header">
      <p class="nnc-demo__eyebrow" translate="no">Live Preview</p>
      <h2 id="nnc-demo-title">Code & Preview</h2>
      <p>HTML に貼るだけで、電車の電光掲示板のようにテキストが流れます。</p>
    </div>

    <div class="nnc-demo__hero-preview" aria-label="nnc-e-display preview">
      <nnc-e-display
        label="次は 2 番線、各駅停車 新宿方面です"
        speed="150"
      ></nnc-e-display>
    </div>

    <div class="nnc-demo__grid">
      <article
        v-for="example in examples"
        :key="example.title"
        class="nnc-demo__example"
      >
        <h3>{{ example.title }}</h3>
        <div class="nnc-demo__preview">
          <nnc-e-display
            :direction="example.direction"
            :label="example.label"
            :speed="example.speed"
          ></nnc-e-display>
        </div>
        <pre><code>{{ example.code }}</code></pre>
      </article>
    </div>
  </section>
</template>
