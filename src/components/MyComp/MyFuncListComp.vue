<script lang="ts" setup>
import { User } from "@element-plus/icons-vue";
</script>

<template>
  <div class="function_container">
    <button class="value">
      <User />
      <span>个人资料</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.function_container {
  display: flex;
  flex-direction: column;
  background-color: $background_color_box_dark;
  justify-content: center;
  border-radius: 1rem;
}
</style>
