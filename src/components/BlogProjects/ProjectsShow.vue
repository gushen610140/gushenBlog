<template>
  <div class="projects-show">
    <el-card
        class="cards"
        v-for="project in projectList"
        :key="project.id"
        @mouseenter="hoverState.hover = true; hoverState.hoverId = project.id"
        @mouseleave="hoverState.hover = false; hoverState.hoverId = null"
    >
      <ProjectsCard :projectInfo="project" :hoverState="hoverState" @triggerDeleteProject="handleNotify"></ProjectsCard>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import ProjectsCard from "@/components/BlogProjects/ProjectsShow/ProjectsCard.vue"
import axios from 'axios'
import useRoute from "@/hooks/useRoute.ts";
import {ref} from "vue";

let projectList = ref([])
axios.get(`${useRoute.BackEnd}/projects`).then(res => {
  projectList.value = res.data
})

let hoverState = ref({
  hover: false,
  hoverId: null
})

const handleNotify = () => {
  axios.get(`${useRoute.BackEnd}/projects`).then(res => {
    projectList.value = res.data
  })
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.cards {
  border: none;
  background-color: $box-background-color-dark;
  margin: 40px 0;
}

.cards:hover {
  box-shadow: $box-shadow-hover;
}
</style>