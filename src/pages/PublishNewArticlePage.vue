<script lang="ts" setup>
import { ref } from "vue";
import "vuetify/styles";
import { VuetifyTiptap, VuetifyViewer } from "vuetify-pro-tiptap";
import Header from "@/components/LayoutComp/Header.vue";
import { addArticleAPI } from "@/api/ArticleAPI.ts";
import { checkHtmlContentIsSpace, checkStringIsSpace } from "@/hooks/useCheckSpaceHook.ts";

const articlePostVO = ref<ArticlePostVO>({
  title: "",
  content: "",
  introduction: "",
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

const publishEvent = () => {
  if (
    checkStringIsSpace(articlePostVO.value.title) ||
    checkHtmlContentIsSpace(articlePostVO.value.content) ||
    checkStringIsSpace(articlePostVO.value.introduction)
  ) {
    noticeBarProperty.value = {
      show: true,
      text: "请填写完整的内容",
      type: "error",
    };
    return;
  }
  addArticleAPI(articlePostVO.value).then((res) => {
    if (res.data) {
      noticeBarProperty.value = {
        show: true,
        text: "发表成功",
        type: "success",
      };
      articlePostVO.value = {
        title: "",
        content: "",
        introduction: "",
      };
    } else {
      noticeBarProperty.value = {
        show: true,
        text: "发表失败",
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
      <v-text-field
        v-model="articlePostVO.title"
        label="文章标题"
        placeholder="建议在10个字符以内"
      ></v-text-field>
      <v-text-field
        v-model="articlePostVO.introduction"
        label="文章简介"
        placeholder="建议在20-50个字符"
      ></v-text-field>
      <VuetifyTiptap
        v-model="articlePostVO.content"
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
            ><v-btn min-width="100%" variant="tonal" @click="publishEvent">发表</v-btn></v-col
          >
        </v-row>
      </v-container>
      <v-divider style="margin: 1rem 0"></v-divider>
      <VuetifyViewer :value="articlePostVO.content" markdown-theme="github" />
    </VContainer>
  </VApp>
</template>

<style lang="scss" scoped>
.v-theme--dark {
  --v-theme-background: 0, 0, 0, 0;
}
</style>
