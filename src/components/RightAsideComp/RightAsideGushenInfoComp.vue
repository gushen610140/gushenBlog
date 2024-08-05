<template>
  <div class="my-info">
    <el-avatar :size="50" src="/myAvatar.jpg"></el-avatar>
    <div class="name">剑霜寒</div>
    <button class="button" @click="goGitee">Github</button>
  </div>
</template>

<script lang="ts" setup>
function goGitee() {
  window.open("https://github.com/gushen610140");
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
  height: 2rem;
  width: 6rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  background-color: $background_color_box_dark;
  transition: $transition_slow;
  box-shadow: $box_shadow_regular_dark;
  color: $color_regular;
}

.button:hover {
  box-shadow: $box_shadow_vivid;
}
</style>
