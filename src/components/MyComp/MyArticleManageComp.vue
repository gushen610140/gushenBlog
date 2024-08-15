<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { deleteArticleAPI, getArticleCountAPI, getArticleListByPageAPI } from "@/api/ArticleAPI.ts";
import { changePageHook } from "@/hooks/useRouterHook.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";

const articleList = ref<ArticleDO[]>([]);
const pageConfig = ref({
  curPage: 1,
  pageSize: 10,
  totalPage: 0,
});

onMounted(() => {
  updatePageEvent();
});

const updatePageEvent = () => {
  getArticleListByPageAPI(pageConfig.value.curPage, pageConfig.value.pageSize).then((res) => {
    articleList.value = res.data;
  });
  getArticleCountAPI().then((res) => {
    pageConfig.value.totalPage = Math.ceil(res.data / pageConfig.value.pageSize);
    if (pageConfig.value.curPage > pageConfig.value.totalPage) {
      pageConfig.value.curPage = pageConfig.value.totalPage;
      updatePageEvent();
    }
  });
};

const updateCurPageEvent = (curPage: number) => {
  pageConfig.value.curPage = curPage;
  updatePageEvent();
};

const deleteArticleEvent = (id: string) => {
  deleteArticleAPI(id).then((res) => {
    if (res.data) {
      noticeSuccess(res.message);
      updatePageEvent();
    } else {
      noticeError(res.message);
    }
  });
};
</script>

<template>
  <div class="article_manage_container">
    <div class="title">文章管理</div>
    <div class="btn publish" @click="changePageHook('/publish_article')">发布新文章</div>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <v-pagination
      :length="pageConfig.totalPage"
      :model-value="pageConfig.curPage"
      density="compact"
      rounded="circle"
      style="margin-bottom: 1rem"
      @update:modelValue="updateCurPageEvent"
    ></v-pagination>
    <table style="padding: 1rem; width: 100%">
      <tr style="text-align: center; height: 2rem; color: #b1b3b8">
        <td style="width: 30%">文章标题</td>
        <td style="width: 10%">作者</td>
        <td style="width: 20%">发布时间</td>
        <td style="width: 20%">操作</td>
      </tr>
      <tr
        v-for="articleItem in articleList"
        :key="articleItem.id"
        style="height: 3rem; box-shadow: 0 5px 1px -5px #fff; text-align: center"
      >
        <td>{{ articleItem.title }}</td>
        <td>{{ articleItem.author_nickname }}</td>
        <td>{{ articleItem.publish_time }}</td>
        <td style="display: flex; align-items: center; justify-content: center; height: 3rem">
          <div class="btn edit_btn" @click="changePageHook(`/edit_article/${articleItem.id}`)">
            编辑
          </div>
          <v-dialog max-width="500" persistent theme="dark">
            <template v-slot:activator="{ props }">
              <div class="btn del_btn" v-bind="props">删除</div>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="提示">
                <v-card-text>您确定要删除 {{ articleItem.title }} 这篇文章吗? </v-card-text>
                <v-card-actions>
                  <v-btn text="取消" @click="isActive.value = false"></v-btn>
                  <v-btn
                    color="red"
                    text="确认删除"
                    variant="flat"
                    @click="
                      deleteArticleEvent(articleItem.id);
                      isActive.value = false;
                    "
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
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
  position: relative;
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

.publish {
  position: absolute;
  right: 3rem;
  top: 4rem;
  background-color: #cbcbcb;
  color: #2f2f2f;
  width: 6rem;
}

.publish:hover {
  box-shadow: 0 0 0.5rem #cbcbcb;
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
