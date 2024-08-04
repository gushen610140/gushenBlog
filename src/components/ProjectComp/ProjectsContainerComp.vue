<template>
  <div class="project_container">
    <ProjectsCard
      v-for="project in projectList"
      :key="project.id"
      :projectInfo="project"
      @projectDeleted="projectDeleted"
    ></ProjectsCard>
  </div>
</template>

<script lang="ts" setup>
import ProjectsCard from "@/components/ProjectComp/ProjectsCardComp.vue";
import { onMounted, ref } from "vue";
import getProjects from "@/hooks/AsyncRequest/Projects/getProjects.ts";
import { getProjectListAPI } from "@/api/ProjectAPI.ts";

const projectList = ref<ProjectDO[]>();
onMounted(() => {
  getProjectListAPI().then((res) => {
    projectList.value = res.data;
  });
});

const projectDeleted = () => {
  getProjects().then((res: ProjectDO[]) => {
    projectList.value = res;
  });
};
</script>

<style lang="scss" scoped>
.project_container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 1rem 0;
}
</style>
