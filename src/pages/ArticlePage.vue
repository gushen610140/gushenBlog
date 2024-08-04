<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <el-row>
    <el-col :offset="1" :span="15">
      <ArticleContainerComp></ArticleContainerComp>
    </el-col>
    <el-col :offset="1" :span="6">
      <RightAsideContainerComp></RightAsideContainerComp>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import RightAsideContainerComp from "@/components/RightAsideComp/RightAsideContainerComp.vue";
import ArticleContainerComp from "@/components/ArticleComp/ArticlesContainerComp.vue";
import Header from "@/components/Layout/Header.vue";
</script>

<style lang="scss" scoped></style>
