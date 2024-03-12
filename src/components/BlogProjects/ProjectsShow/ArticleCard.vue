<template>
  <div class="article-card">
    <div class="title">
      outfit-free
    </div>
    <div class="content">
      由vue重构的商城项目
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.title {
  background-image: $font-color-selected-dark;
  background-clip: text;
  color: $font-color-dark;
  font-size: $font-size-title;
  font-weight: $font-weight-big;
}
.content {
  color: $font-color-dark;
  font-size: $font-size-body;
  margin-left: 1rem;
}
</style>