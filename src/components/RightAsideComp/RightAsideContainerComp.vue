<template>
  <div class="right_aside_container">
    <RightAsideGushenInfoComp></RightAsideGushenInfoComp>
    <RightAsideBlogInfoComp></RightAsideBlogInfoComp>
    <RightAsideBlogLawInfoComp></RightAsideBlogLawInfoComp>
  </div>
</template>

<script setup>
import RightAsideGushenInfoComp from "@/components/RightAsideComp/RightAsideGushenInfoComp.vue";
import RightAsideBlogInfoComp from "@/components/RightAsideComp/RightAsideBlogInfoComp.vue";
import RightAsideBlogLawInfoComp from "@/components/RightAsideComp/RightAsideBlogLawInfoComp.vue";
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
