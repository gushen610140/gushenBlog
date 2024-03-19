<template>
  <div class="projects-show">
    <el-card class="cards" v-for="project in projectList" :key="project.id" @click="openProjects(project.link)">
      <ProjectsCard :projectInfo="project"></ProjectsCard>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import ProjectsCard from "@/components/BlogProjects/ProjectsShow/ProjectsCard.vue"
import axios from 'axios'
import useRoute from "@/hooks/useRoute.ts";
import { reactive, ref } from "vue";

function openProjects(link) {
  window.open(link)
}

let projectList = ref([])
axios.get(`${useRoute.BackEnd}/projects`).then(res => {
  projectList.value = res.data
})

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
  box-shadow: $box-shadow-hover;
}
</style>