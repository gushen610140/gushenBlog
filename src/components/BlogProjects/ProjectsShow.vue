<template>
  <div class="projects-show">
    <el-card class="cards">
      <ArticleCard @click="openProjects"></ArticleCard>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import ArticleCard from "@/components/BlogProjects/ProjectsShow/ArticleCard.vue"

function openProjects() {
  window.open("http://sunway.icu:3000")
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.cards {
  border: none;
  background-color: $box-background-color-dark;
  margin: 40px 0;
  display: flex;
  cursor: pointer;
}
.cards:hover {
  box-shadow: 0 0 5px $font-color-dark;
}
</style>