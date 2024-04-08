<template>
  <div class="layout">
    <BlogHeader class="blog-header"></BlogHeader>
    <BlogBody class="blog-body"></BlogBody>
    <BlogFooter class="blog-footer"></BlogFooter>
  </div>
</template>

<script setup lang="ts">

import BlogHeader from "@/views/layout/BlogHeader.vue"
import BlogBody from "@/views/layout/BlogBody.vue"
import BlogFooter from "@/views/layout/BlogFooter.vue"

</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.layout {
  // 宽度不能设置为 100% 防止出现横向滚动条
  width: $layout-width;
}

.blog-header {
  position: fixed;
  width: $layout-width;
  box-sizing: border-box;
}

.blog-body {
  width: $layout-width;
  // 由于 header 的 fixed 属性脱离文档流，处理 body 向下移动
  padding-top: 80px;
}

.blog-footer {
  width: $layout-width;
}
</style>