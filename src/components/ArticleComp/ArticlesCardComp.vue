<template>
  <div class="card_body" @click="isOpenViewWindow = true">
    <div class="title">
      {{ props.articleInfo.title }}
    </div>
    <div class="content">
      {{ computedSimpleContent }}
    </div>
  </div>
  <Transition>
    <ArticleViewComp
      v-if="isOpenViewWindow"
      :articleInfo="props.articleInfo"
      @closeViewWindow="isOpenViewWindow = false"
    ></ArticleViewComp>
  </Transition>
</template>

<script lang="ts" setup>
import ArticleViewComp from "@/components/ArticleComp/ArticleViewComp.vue";
import { computed, ref } from "vue";

const props = defineProps<{
  articleInfo: ArticleDO;
}>();

// TODO 文字裁剪长度随高度变化
const computedSimpleContent = computed(() =>
  props.articleInfo.content.length > 80
    ? props.articleInfo.content.substring(0, 80) + "..."
    : props.articleInfo.content,
);

const isOpenViewWindow = ref(false);
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.card_body {
  padding: 1rem;
  border: none;
  background-color: $background_color_box_dark;
  border-radius: 1rem;
  height: 10rem;
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

// 文章窗口出现动画
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
