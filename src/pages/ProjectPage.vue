<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <el-row>
    <el-col :offset="1" :span="15">
      <ProjectsContainer></ProjectsContainer>
    </el-col>
    <el-col :offset="1" :span="6">
      <RightAsideContainerComp></RightAsideContainerComp>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import ProjectsContainer from "@/components/ProjectComp/ProjectsContainerComp.vue";
import RightAsideContainerComp from "@/components/RightAsideComp/RightAsideContainerComp.vue";
import Header from "@/components/LayoutComp/Header.vue";
</script>

<style lang="scss" scoped></style>
