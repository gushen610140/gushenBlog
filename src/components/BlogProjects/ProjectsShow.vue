<template>
  <div class="projects-show">
    <div class="cards" v-for="project in projectList" :key="project.id">
      <ProjectsCard :projectInfo="project" @triggerDeleteProject="handleNotify"></ProjectsCard>
    </div>
  </div>
</template>

<script setup lang="ts">

import ProjectsCard from "@/components/BlogProjects/ProjectsShow/ProjectsCard.vue"
import axios from 'axios'
import useRoute from "@/hooks/useRoute.ts";
import {ref} from "vue";
import ProjectInfo from "@/type/ProjectInfo.ts";

let projectList = ref<ProjectInfo[]>()
axios.get(`${useRoute.BackEnd}/projects`).then(res => {
  projectList.value = res.data
})

const handleNotify = () => {
  axios.get(`${useRoute.BackEnd}/projects`).then(res => {
    projectList.value = res.data
  })
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.cards:hover {
  box-shadow: $box-shadow-hover;
}
</style>