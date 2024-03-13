<template>
  <div class="card-body">
    <div class="title">
      {{ articleInfo.title }}
    </div>
    <div class="content">
      {{ articleInfo.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
const {articleInfo} = defineProps({articleInfo: Object})
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