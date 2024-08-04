<template>
  <div class="nav_container">
    <div class="title"><span class="title_content">Gushen Blog</span></div>
    <ul class="navigator">
      <li
        v-for="item in navList"
        :key="item.path"
        class="nav_item"
        @click="changePageHook(item.path)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { changePageHook } from "@/hooks/useChangePageHook.ts";

const navList = [
  {
    label: "文章",
    path: "/articles",
  },
  {
    label: "项目",
    path: "/projects",
  },
  {
    label: "我的",
    path: "/my",
  },
];
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.nav_container {
  margin: 35vh auto;
  width: 40vw;
}

.title {
  font-size: $font_size_very_big;
  margin-bottom: 4rem;
  text-align: center;
  .title_content {
    background-image: $background_image_regular;
    color: transparent;
    background-clip: text;
    font-weight: $font_weight_big;
  }
}

.navigator {
  height: 3rem;
  box-shadow: $box-shadow-border-light;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: $font_size_regular;
  font-weight: $font_weight_big;
}

.nav_item {
  font-size: $font_size_regular;
  font-weight: $font_weight_big;
  margin: 0 1rem;
  cursor: pointer;
  // 将 color 设置透明以显示背景图片
  color: transparent;
  background-image: $background_image_regular;
  background-clip: text;
  transition: $transition_slow;
  // 现代化技术 css filter (IE: ?)
  // 以此制作背景图片的透明度过渡
  // 利用极端亮度制作白色效果
  filter: brightness(2);
}

.nav_item:hover {
  filter: none;
}
</style>
