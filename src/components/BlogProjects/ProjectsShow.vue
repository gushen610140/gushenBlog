<template>
  <div class="projects-show">
    <el-card class="cards" v-for="project in projectList" :key="project.id" @click="openProjects">
      <ProjectsCard :projectInfo="project"></ProjectsCard>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import ProjectsCard from "@/components/BlogProjects/ProjectsShow/ProjectsCard.vue"

function openProjects() {
  window.open("http://sunway.icu:3000")
}

const projectList = [
  {
    id: 1,
    title: "outfit-free",
    content: "由vue重构的商城项目"
  }
]

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