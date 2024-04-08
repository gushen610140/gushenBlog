<template>
  <div class="page-body">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="16">
        <ArticlesShow></ArticlesShow>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
        <RightAside></RightAside>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import RightAside from "@/views/layout/RightAside.vue"
import ArticlesShow from "@/components/BlogArticles/ArticlesContainer.vue"
</script>

<style lang="scss" scoped>

</style>