<template>
  <div class="page-body">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="16">
        <ProjectsShow></ProjectsShow>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
        <ProjectsMe></ProjectsMe>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ProjectsShow from "@/components/BlogProjects/ProjectsContainer.vue"
import ProjectsMe from "@/views/layout/RightAside.vue"
</script>

<style lang="scss" scoped>
</style>