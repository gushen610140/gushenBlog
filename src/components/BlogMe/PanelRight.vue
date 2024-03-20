<template>
  <div class="panel-body">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.panel-body {
  background-color: $box-background-color-dark;
  width: inherit;
  height: 800px;
  box-shadow: $box-shadow-normal;
  transition: $transition-regular;
}
.panel-body:hover {
  box-shadow: $box-shadow-hover;
}
</style>