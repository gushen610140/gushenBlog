<template>
  <el-menu 
    class="el-menu-vertical-demo controller-body" 
    default-active="/projects"
    @select="handleSelect"
  >
    <el-menu-item class="menu-items" index="/projects">
      发表项目
    </el-menu-item>
    <el-menu-item class="menu-items" index="/articles">
      发表文章
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter(), route = useRoute()

const handleSelect = (index) => {  
  router.push("/me" + index)
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/element.scss";
.controller-body {
  background-color: $box-background-color-dark;
  height: 800px;
  padding-top: 1rem;
  transition: $transition-regular;
  box-shadow: $box-shadow-normal;
}
.controller-body:hover {
  box-shadow: $box-shadow-hover;
}
</style>