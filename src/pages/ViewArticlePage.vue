<script lang="ts" setup>
import Header from "@/components/LayoutComp/Header.vue";

import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { getArticleByIdAPI } from "@/api/ArticleAPI.ts";
import {
  addLikeAPI,
  checkIsLikedAPI,
  getLikeCountFromArticleAPI,
  removeLikeFromArticleAPI,
} from "@/api/LikeAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";

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

const likeCount = ref<number>(0);
const isLike = ref<boolean>(false);
const likeIconColorComp = computed(() => {
  if (isLike.value) {
    return "yellow";
  } else {
    return "none";
  }
});

onMounted(() => {
  getArticleByIdAPI(route.params.id as string).then((res) => {
    articleDO.value = res.data;
  });
  getLikeCountFromArticleAPI(route.params.id as string).then((res) => {
    if (res.code == 200) likeCount.value = res.data;
  });
  checkIsLikedAPI(route.params.id as string).then((res) => {
    isLike.value = res.data;
  });
});

const addLikeEvent = () => {
  addLikeAPI(articleDO.value.id).then((res) => {
    if (res.data) {
      likeCount.value++;
      isLike.value = true;
      noticeSuccess(res.message);
    } else {
      removeLikeFromArticleAPI(articleDO.value.id).then((res) => {
        if (res.data) {
          likeCount.value--;
          isLike.value = false;
          noticeSuccess(res.message);
        } else {
          noticeError(res.message);
        }
      });
    }
  });
};
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <div class="article_container">
    <div class="title">{{ articleDO.title }}</div>
    <div class="author">文章作者: {{ articleDO.author_nickname }}</div>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <div class="content" v-html="articleDO.content"></div>
    <v-divider></v-divider>
    <div class="container flex justify-end mt-5">
      <v-icon
        :color="likeIconColorComp"
        class="cursor-pointer"
        icon="mdi-star"
        @click="addLikeEvent"
      ></v-icon>
      <span class="ml-2 text-center">{{ likeCount }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.article_container {
  width: 80vw;
  margin: 0 auto 5rem;
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
