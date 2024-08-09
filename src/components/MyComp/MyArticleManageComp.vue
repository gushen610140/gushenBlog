<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  getArticleCountAPI,
  getArticleListByPageAPI,
} from "@/api/ArticleAPI.ts";

const articleList = ref<ArticleDO[]>([]);
const pageConfig = ref({
  curPage: 1,
  pageSize: 10,
  totalPage: 0,
});

onMounted(() => {
  updatePageEvent();
  getArticleCountAPI().then((res) => {
    pageConfig.value.totalPage = Math.ceil(
      res.data / pageConfig.value.pageSize,
    );
  });
});

const updatePageEvent = () => {
  getArticleListByPageAPI(
    pageConfig.value.curPage,
    pageConfig.value.pageSize,
  ).then((res) => {
    articleList.value = res.data;
  });
};

const updateCurPageEvent = (curPage: number) => {
  pageConfig.value.curPage = curPage;
  updatePageEvent();
};
</script>

<template>
  <div class="article_manage_container">
    <div class="title">文章管理</div>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <v-pagination
      :length="pageConfig.totalPage"
      density="compact"
      rounded="circle"
      style="margin-bottom: 1rem"
      @update:modelValue="updateCurPageEvent"
    ></v-pagination>
    <table style="padding: 1rem; margin: 0 1rem">
      <tr style="text-align: center; height: 2rem; color: #b1b3b8">
        <td style="width: 10rem">文章标题</td>
        <td style="width: 5rem">作者</td>
        <td style="width: 15rem">发布时间</td>
        <td style="width: 4rem">评论数</td>
        <td style="width: 4rem">收藏数</td>
        <td style="width: 10rem">操作</td>
      </tr>
      <tr
        v-for="articleItem in articleList"
        :key="articleItem.id"
        style="
          height: 3rem;
          box-shadow: 0 5px 1px -5px #fff;
          text-align: center;
        "
      >
        <td>{{ articleItem.title }}</td>
        <td>{{ articleItem.author_nickname }}</td>
        <td>{{ articleItem.publish_time }}</td>
        <td>{{ articleItem.comment_count }}</td>
        <td>{{ articleItem.like_count }}</td>
        <td
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 3rem;
          "
        >
          <div class="btn edit_btn">编辑</div>
          <div class="btn del_btn">删除</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.article_manage_container {
  border-radius: 1rem;
  padding: 1rem;
  background-color: $background_color_box_dark;
}

.title {
  font-size: $font_size_big;
  margin-left: 2rem;
  margin-top: 1rem;
}

.btn {
  text-align: center;
  width: 3rem;
  height: 1.5rem;
  line-height: 1.5rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: $transition_slow;
}

.edit_btn {
  background-color: #238636;
}

.edit_btn:hover {
  box-shadow: 0 0 0.5rem #238636;
}

.del_btn {
  margin-left: 0.5rem;
  background-color: #f85149;
}

.del_btn:hover {
  box-shadow: 0 0 0.5rem #f85149;
}
</style>
