<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <el-row>
    <el-col :offset="1" :span="projectColSpan">
      <ProjectsContainer></ProjectsContainer>
    </el-col>
    <el-col v-show="!store.isMobile" :offset="1" :span="6">
      <RightAsideContainerComp></RightAsideContainerComp>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import ProjectsContainer from "@/components/ProjectComp/ProjectsContainerComp.vue";
import RightAsideContainerComp from "@/components/RightAsideComp/RightAsideContainerComp.vue";
import Header from "@/components/LayoutComp/Header.vue";
import { useWindowSizeStore } from "@/store";
import { computed } from "vue";

const store = useWindowSizeStore();

const useColProperty = () => {
  const projectColSpan = computed(() => (store.isMobile ? 22 : 15));

  return {
    projectColSpan,
  };
};

const { projectColSpan } = useColProperty();
</script>

<style lang="scss" scoped></style>
