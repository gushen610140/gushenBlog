<script lang="ts" setup>
const { content, font_size, font_color, background_color, width, height } =
  defineProps<{
    content?: string;
    font_size?: string;
    font_color?: string;
    background_color?: string;
    width?: string;
    height?: string;
  }>();
</script>

<template>
  <button class="button">{{ content || "Button" }}</button>
</template>

<style lang="scss" scoped>
.button {
  width: v-bind("width || '8rem'");
  height: v-bind("height || '2.5rem'");
  padding: 0.3rem;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  color: v-bind("font_color || '#fff'");
  background: v-bind("background_color || 'transparent'");
  font-size: v-bind("font_size || '17px'");
  transition: all 300ms ease;
  box-shadow:
    3px 3px 10px rgba(0, 0, 0, 1),
    -1px -1px 6px rgba(255, 255, 255, 0.4);
}

.button:hover {
  box-shadow:
    3px 3px 10px rgba(0, 0, 0, 1),
    -1px -1px 6px rgba(255, 255, 255, 0.4),
    inset 3px 3px 10px rgba(0, 0, 0, 1),
    inset -1px -1px 6px rgba(255, 255, 255, 0.4);
}
</style>
