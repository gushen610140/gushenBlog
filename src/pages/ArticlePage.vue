<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <el-row>
    <el-col :offset="1" :span="articleColSpan">
      <ArticleContainerComp></ArticleContainerComp>
    </el-col>
    <el-col v-show="!store.isMobile" :offset="1" :span="6">
      <RightAsideContainerComp></RightAsideContainerComp>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import RightAsideContainerComp from "@/components/RightAsideComp/RightAsideContainerComp.vue";
import ArticleContainerComp from "@/components/ArticleComp/ArticlesContainerComp.vue";
import Header from "@/components/LayoutComp/Header.vue";
import { useWindowSizeStore } from "@/store";
import { computed } from "vue";

const store = useWindowSizeStore();

const useColProperty = () => {
  const articleColSpan = computed(() => (store.isMobile ? 22 : 15));

  return {
    articleColSpan,
  };
};

const { articleColSpan } = useColProperty();
</script>

<style lang="scss" scoped></style>
