<script lang="ts" setup></script>

<template>
  <div class="blog_law_container">
    <div style="text-align: center">网站相关</div>
    <ul>
      <li>
        <span>版权归属： © 2009-2019 Aliyun.com 版权所有</span>
      </li>
      <li>
        <span
          >备案信息：
          <a href="https://beian.miit.gov.cn" target="_blank"
            >浙ICP备2023048008号-1</a
          ></span
        >
      </li>
      <li>
        <span>网站说明： 本网站仅用于学习展示</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.blog_law_container {
  padding: 1rem;
  height: 10rem;
  background-color: $background_color_box_dark;
  transition: $transition_slow;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  line-height: $line_height_big;
  color: $color_small;
}

.blog_law_container:hover {
  box-shadow: $box_shadow_regular_light;
}

a {
  color: transparent;
  background-image: $background_image_regular;
  background-clip: text;
  filter: brightness(4);
  transition: $transition_regular;
}

a:hover {
  filter: none;
}
</style>
