<script lang="ts" setup>
import Header from "@/components/LayoutComp/Header.vue";

import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getArticleByIdAPI } from "@/api/ArticleAPI.ts";

const route = useRoute();

const articleDO = ref<ArticleDO>({
  id: "",
  title: "文章加载中，请稍候",
  content: "文章加载中，请稍候",
  publish_time: "",
  comment_count: 0,
  like_count: 0,
  author_id: "",
  author_nickname: "",
});

onMounted(() => {
  getArticleByIdAPI(route.params.id as string).then((res) => {
    articleDO.value = res.data;
  });
});
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <div class="article_container">
    <div class="title">{{ articleDO.title }}</div>
    <div class="author">文章作者: {{ articleDO.author_nickname }}</div>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <div class="content" v-html="articleDO.content"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.article_container {
  width: 80vw;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 1rem;
  background-color: $background_color_box_dark;
  position: relative;
  word-wrap: break-word;
}

.title {
  font-size: $font_size_big;
  margin-left: 2rem;
}

.author {
  font-size: $font_size_regular;
  text-align: right;
  position: absolute;
  right: 3rem;
  top: 4.5rem;
}

.content {
  padding: 1rem;
}
</style>
