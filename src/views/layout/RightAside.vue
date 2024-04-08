<template>
  <div class="projects-me description-container">
    <el-card class="cards">
      <UserInfoCard></UserInfoCard>
    </el-card>
    <el-card class="cards my-info">
      <MyInfo></MyInfo>
    </el-card>
    <el-card class="cards">
      <BlogInfo></BlogInfo>
    </el-card>
  </div>
</template>

<script setup>

import MyInfo from "@/components/BlogInfo/MyInfo.vue"
import BlogInfo from "@/components/BlogInfo/BlogInfo.vue"
import UserInfoCard from "@/components/BlogUser/UserCard.vue"

</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.cards {
  border: none;
  background-color: $box-background-color-dark;
  margin: 40px 0;
}

.cards:hover {
  box-shadow: 0 0 5px $font-color-dark;
}
</style>