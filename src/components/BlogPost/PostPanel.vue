<template>
  <div class="post-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.post-container {
  background-color: $box-background-color-dark;
  box-shadow: $box-shadow-border-dark;
  width: inherit;
  transition: $transition-regular;
}

.post-container:hover {
  box-shadow: $box-shadow-border-light;
}
</style>