<script lang="ts" setup>
import { useStore } from "vuex";

const store = useStore();

// 控制响应式全局变化的窗体大小，用vuex保存
window.onresize = () => {
  store.commit("setWindowSize", window.innerWidth);
};
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "@/styles/index.scss";
@import "@/styles/base.scss";
@import "@/styles/element.scss";

.app {
  // 解决 margin 塌陷问题
  overflow: hidden;
  width: 95vw;
}
</style>
