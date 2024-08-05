<template>
  <div class="my-info">
    <el-avatar :size="50" src="/myAvatar.jpg"></el-avatar>
    <div class="name">剑霜寒</div>
    <el-button class="button" type="info" @click="goGitee">My Gitee</el-button>
  </div>
</template>

<script lang="ts" setup>
function goGitee() {
  window.open("https://gitee.com/gushenfree");
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.my-info {
  background-color: $background_color_box_dark;
  transition: $transition_slow;
  border-radius: 1rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.my-info:hover {
  box-shadow: $box_shadow_regular_light;
}

.name {
  color: $font_color_white;
  font-weight: $font_weight_small;
  margin-top: 10px;
  cursor: default;
  user-select: none;
}

.button {
  margin-top: 10px;
}
</style>
