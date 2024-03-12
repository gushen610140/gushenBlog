<template>
  <div class="my-info">
    <el-avatar :size="50" :src="avatar"></el-avatar>
    <div class="name">剑霜寒</div>
    <el-button @click="goGitee" type="info" class="button">My Gitee</el-button>
  </div>
</template>

<script setup lang="ts">
import avatar from "@/assets/Images/myAvatar.jpg"

function goGitee() {
  window.open("https://gitee.com/gushenfree");
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/element.scss";
.my-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name {
  color: $font-color-dark;
  font-weight: $font-weight-small;
  margin-top: 10px;
  cursor: default;
  user-select: none;
}
.button {
  margin-top: 10px;
}
</style>