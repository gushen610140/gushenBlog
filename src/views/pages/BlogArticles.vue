<template>
  <div class="page-body">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="16">
        <ArticlesShow></ArticlesShow>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
        <ProjectsMe></ProjectsMe>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ProjectsMe from "@/components/BlogProjects/ProjectsMe.vue"
import ArticlesShow from "@/components/BlogArticles/ArticlesShow.vue"
</script>

<style lang="scss" scoped>

</style>