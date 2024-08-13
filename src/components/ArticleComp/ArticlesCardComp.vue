<template>
  <div class="card_body container h-44 overflow-hidden">
    <div class="title">
      {{ props.articleInfo.title }}
    </div>
    <div
      class="overflow-hidden indent-4 mt-2 text-ellipsis mb-10"
      v-html="articleInfo.content"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  articleInfo: ArticleDO;
}>();

// TODO 文章简介
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.card_body {
  padding: 1rem;
  border: none;
  background-color: $background_color_box_dark;
  border-radius: 1rem;
  cursor: pointer;
  transition: $transition_slow;
}

.card_body:hover {
  box-shadow: $box_shadow_regular_light;
}

.title {
  background-image: $background_image_regular;
  background-clip: text;
  color: transparent;
  font-size: $font_size_little_big;
  font-weight: $font_weight_big;
}
</style>
