<template>
  <el-card class="body">
    <div class="title">
      {{ props.articleInfo.title }}
    </div>
    <div class="content">
      {{ props.articleInfo.content }}
    </div>
  </el-card>
</template>

<script setup lang="ts">
import ArticleInfo from "@/type/ArticleInfo.ts"

const props = defineProps<{
  articleInfo: ArticleInfo
}>()
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.body {
  background-color: transparent;
  border: none;
}

.title {
  background-image: $gradient-colorful;
  background-clip: text;
  color: transparent;
  font-size: $font-size-title-small;
  font-weight: $font-weight-big;
}

.content {
  color: $font-color-dark;
  font-size: $font-size-body;
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>