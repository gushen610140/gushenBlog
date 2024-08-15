<script lang="ts" setup>
// 控制响应式全局变化的窗体大小，用pinia保存
import { useWindowSizeStore } from "@/store";

const store = useWindowSizeStore();

window.onresize = () => {
  store.setWindowSize(window.innerWidth);
};
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "@/styles/index.scss";

.app {
  // 解决 margin 塌陷问题
  overflow: hidden;
  width: 95vw;
}
</style>
