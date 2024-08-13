<script lang="ts" setup>
import { onMounted, ref } from "vue";
import "vuetify/styles";
import { VuetifyTiptap, VuetifyViewer } from "vuetify-pro-tiptap";
import Header from "@/components/LayoutComp/Header.vue";
import { getArticleByIdAPI, updateArticleAPI } from "@/api/ArticleAPI.ts";
import { useRoute } from "vue-router";
import { changePageHook } from "@/hooks/useRouterHook.ts";
import { checkHtmlContentIsSpace } from "@/hooks/useCheckSpaceHook.ts";

const route = useRoute();

onMounted(() => {
  getArticleByIdAPI(route.params.id as string).then((res) => {
    articleUpdateVO.value.id = res.data.id;
    articleUpdateVO.value.title = res.data.title;
    articleUpdateVO.value.content = res.data.content;
  });
});

const articleUpdateVO = ref<ArticleUpdateVO>({
  id: "",
  title: "",
  content: "",
});

const noticeBarProperty = ref<{
  show: boolean;
  text: string;
  type: "info" | "success" | "error" | "warning";
}>({
  show: false,
  text: "",
  type: "info",
});

const updateEvent = () => {
  if (
    checkHtmlContentIsSpace(articleUpdateVO.value.title) ||
    checkHtmlContentIsSpace(articleUpdateVO.value.content)
  ) {
    noticeBarProperty.value = {
      show: true,
      text: "标题或内容不能为空",
      type: "error",
    };
    return;
  }
  updateArticleAPI(articleUpdateVO.value).then((res) => {
    if (res.data) {
      noticeBarProperty.value = {
        show: true,
        text: "更新成功，三秒后返回管理页面",
        type: "success",
      };
      setTimeout(() => {
        changePageHook("/my/article_manage");
      }, 3000);
    } else {
      noticeBarProperty.value = {
        show: true,
        text: "更新失败",
        type: "error",
      };
    }
  });
};
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <VApp id="app" theme="dark">
    <VContainer>
      <v-slide-y-transition>
        <v-alert
          v-model="noticeBarProperty.show"
          :text="noticeBarProperty.text"
          :type="noticeBarProperty.type"
          closable
          style="margin-bottom: 1rem"
          @click:close="noticeBarProperty.show = false"
        ></v-alert>
      </v-slide-y-transition>
      <v-text-field v-model="articleUpdateVO.title" label="文章标题"></v-text-field>
      <VuetifyTiptap
        v-model="articleUpdateVO.content"
        :max-height="465"
        :max-width="900"
        :min-height="200"
        label="内容编辑器"
        markdown-theme="github"
        rounded
      />
      <v-container>
        <v-row>
          <v-col cols="11"></v-col>
          <v-col cols="1"
            ><v-btn min-width="100%" variant="tonal" @click="updateEvent">更新</v-btn></v-col
          >
        </v-row>
      </v-container>
      <v-divider style="margin: 1rem 0"></v-divider>
      <VuetifyViewer :value="articleUpdateVO.content" markdown-theme="github" />
    </VContainer>
  </VApp>
</template>

<style lang="scss" scoped>
.v-theme--dark {
  --v-theme-background: 0, 0, 0, 0;
}
</style>
