<template>
  <div class="layout">
    <BlogHeader></BlogHeader>
    <BlogBody class="blog-body"></BlogBody>
    <BlogFooter class="blog-footer"></BlogFooter>
  </div>
</template>

<script lang="ts" setup>
import BlogHeader from "@/views/layout/BlogHeader.vue";
import BlogBody from "@/views/layout/BlogBody.vue";
import BlogFooter from "@/views/layout/BlogFooter.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

//.blog-header {
//  position: fixed;
//  width: $layout-width;
//  box-sizing: border-box;
//}

.blog-body {
  width: $layout-width;
  // 由于 header 的 fixed 属性脱离文档流，处理 body 向下移动
  padding-top: 80px;
}
</style>
