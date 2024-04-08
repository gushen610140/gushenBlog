<template>
  <div class="container">
    <div class="cards" v-for="project in projectList" :key="project.id">
      <ProjectsCard :projectInfo="project" @projectDeleted="projectDeleted"></ProjectsCard>
    </div>
  </div>
</template>

<script setup lang="ts">

import ProjectsCard from "@/components/BlogProjects/ProjectsCard.vue"
import {onMounted, ref} from "vue";
import ProjectInfo from "@/type/ProjectInfo.ts";
import getProjects from "@/hooks/AsyncRequest/Projects/getProjects.ts";

const projectList = ref<ProjectInfo[]>()
onMounted(() => {
  getProjects().then((res: ProjectInfo[]) => {
    projectList.value = res
  })
})

const projectDeleted = () => {
  getProjects().then((res: ProjectInfo[]) => {
    projectList.value = res
  })
}

</script>

<style lang="scss" scoped>
</style>