<template>
  <div class="card_body">
    <div class="title">
      {{ props.articleInfo.title }}
    </div>
    <div class="content">
      {{ computedSimpleContent }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  articleInfo: ArticleDO;
}>();

// TODO 文字裁剪长度随高度变化
const computedSimpleContent = computed(() =>
  props.articleInfo.content.length > 80
    ? props.articleInfo.content.substring(0, 80) + "..."
    : props.articleInfo.content,
);
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

.content {
  color: $font_color_white;
  font-size: $font_size_regular;
  margin-top: 0.5rem;
  text-indent: 1rem;
}
</style>
