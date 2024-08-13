<template>
  <div class="pb-5 pt-5 container grid grid-cols-2 gap-4">
    <div
      v-for="article in articleList"
      :key="article.id"
      @click="openPageHook(`/article/${article.id}`)"
    >
      <ArticlesCardComp :articleInfo="article"></ArticlesCardComp>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArticlesCardComp from "@/components/ArticleComp/ArticlesCardComp.vue";
import { onMounted, ref } from "vue";
import { getArticleListAPI } from "@/api/ArticleAPI.ts";
import { openPageHook } from "@/hooks/useRouterHook.ts";

const articleList = ref<ArticleDO[]>([]);

onMounted(() => {
  getArticleListAPI().then((res) => {
    articleList.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
