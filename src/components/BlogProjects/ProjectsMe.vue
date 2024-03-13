<template>
  <div class="projects-me description-container">
    <el-card class="cards my-info">
      <MyInfo></MyInfo>
    </el-card>
    <el-card class="cards">
      <BlogInfo></BlogInfo>
    </el-card>
    <el-card class="cards">
    </el-card>
  </div>
</template>

<script setup>

import MyInfo from "@/components/BlogProjects/ProjectsMe/MyInfo.vue"
import BlogInfo from "@/components/BlogProjects/ProjectsMe/BlogInfo.vue"

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.cards {
  border: none;
  background-color: $box-background-color-dark;
  margin: 40px 0;
}
.cards:hover {
  box-shadow: 0 0 5px $font-color-dark;
}
</style>