<template>
  <div class="button-body">
    {{ buttonInfo.content }}
  </div>
</template>

<script setup lang="ts">
const {buttonInfo} = defineProps({buttonInfo: Object})
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.button-body {
  width: 12rem;
  height: 3rem;
  margin-top: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.32);
  transition: $transition-regular;
}
.button-body:hover {
  box-shadow: $box-shadow-hover;
}
</style>