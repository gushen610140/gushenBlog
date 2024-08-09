<template>
  <div class="article_container">
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

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.article_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem 0;
}
</style>
