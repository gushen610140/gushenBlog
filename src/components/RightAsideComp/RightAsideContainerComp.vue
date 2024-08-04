<template>
  <div class="right_aside_container">
    <RightAsideGushenInfo></RightAsideGushenInfo>
    <RightAsideBlogInfo></RightAsideBlogInfo>
  </div>
</template>

<script setup>
import RightAsideGushenInfo from "@/components/RightAsideComp/RightAsideGushenInfo.vue";
import RightAsideBlogInfo from "@/components/RightAsideComp/RightAsideBlogInfo.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.right_aside_container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 1rem 0;
}
</style>
