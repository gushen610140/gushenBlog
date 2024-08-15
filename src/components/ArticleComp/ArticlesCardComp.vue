<template>
  <div class="card_body container h-40 overflow-hidden">
    <div class="title">
      {{ props.articleInfo.title }}
    </div>
    <div class="indent-4 text-ellipsis line-clamp-2 container mt-2">
      {{ props.articleInfo.introduction }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  articleInfo: ArticleDO;
}>();
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
