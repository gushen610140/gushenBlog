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
import CommentContainerComp from "@/components/ArticleComp/CommentContainerComp.vue";
import { addCommentRootAPI, getCommentCountFromArticleAPI } from "@/api/CommentAPI.ts";
import { checkStringIsSpace } from "@/hooks/useCheckSpaceHook.ts";
import { useWindowSizeStore } from "@/store";

const route = useRoute();

const articleDO = ref<ArticleDO>({
  id: "",
  title: "文章加载中，请稍候",
  content: "文章加载中，请稍候",
  publish_time: "",
  author_id: "",
  author_nickname: "",
  introduction: "文章加载中，请稍候",
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

const commentCount = ref<number>(0);
const commentContent = ref("");
const commentContainerCompRef = ref<InstanceType<typeof CommentContainerComp>>();

const store = useWindowSizeStore();

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
  getCommentCountFromArticleAPI(route.params.id as string).then((res) => {
    commentCount.value = res.data;
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

const addCommentRootEvent = () => {
  if (checkStringIsSpace(commentContent.value)) {
    noticeError("评论内容不能为空");
    return;
  }
  addCommentRootAPI(route.params.id as string, commentContent.value).then((res) => {
    if (res.data) {
      commentContent.value = "";
      commentCount.value++;
      if (commentContainerCompRef.value) {
        commentContainerCompRef.value.getCommentListFromArticleEvent();
      }
      noticeSuccess(res.message);
    } else {
      noticeError(res.message);
    }
  });
};
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <div :class="{ article_container_mobile: store.isMobile }" class="article_container">
    <div class="title mb-8 text-center text-3xl">{{ articleDO.title }}</div>
    <div class="author mb-8">文章作者: {{ articleDO.author_nickname }}</div>
    <div class="p-4 text-zinc-300 bg-neutral-700 rounded-lg ml-10 mr-10">
      <v-icon icon="mdi-tooltip-text-outline"></v-icon>
      {{ articleDO.introduction }}
    </div>
    <div class="p-10" v-html="articleDO.content"></div>
    <v-divider></v-divider>
    <div class="container flex justify-end mt-5">
      <v-icon
        :color="likeIconColorComp"
        class="cursor-pointer"
        icon="mdi-thumb-up"
        @click="addLikeEvent"
      ></v-icon>
      <span class="ml-1 text-center">{{ likeCount }}</span>
      <v-icon class="ml-4" icon="mdi-message-reply-text"></v-icon>
      <span class="ml-1 text-center">{{ commentCount }}</span>
    </div>
    <div>
      <v-textarea v-model="commentContent" class="mt-5" label="撰写评论"></v-textarea>
      <div class="flex justify-end">
        <v-btn color="blue" text="发表" theme="dark" @click="addCommentRootEvent"></v-btn>
      </div>
    </div>
    <CommentContainerComp
      ref="commentContainerCompRef"
      :article_id="route.params.id as string"
      class="mt-5"
    ></CommentContainerComp>
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
  word-wrap: break-word;
}

.article_container_mobile {
  background-color: transparent;
  width: 100%;
  margin: 0;
  padding: 0;
}

.author {
  font-size: $font_size_regular;
  text-align: right;
}
</style>
