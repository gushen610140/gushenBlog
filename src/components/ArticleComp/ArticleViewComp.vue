<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";

const props = defineProps<{
  articleInfo: ArticleDO;
}>();

// vue 3.3+ 具名元组语法
const emit = defineEmits<{
  closeViewWindow: [];
}>();

const closeViewWindow = () => {
  emit("closeViewWindow");
};

// TODO 文章预览时滑动相关问题
</script>

<template>
  <div class="transition_root">
    <div class="global_overlay" @click="closeViewWindow"></div>
    <div class="article_container">
      <el-row style="margin-top: 1rem">
        <el-col :span="23"></el-col>
        <el-col :span="1">
          <el-icon :size="30" style="cursor: pointer" @click="closeViewWindow">
            <Close />
          </el-icon>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="6" class="title">
          {{ props.articleInfo.title }}
        </el-col>
        <el-col :span="16"></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="20" class="content">
          {{ props.articleInfo.content }}
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.article_container {
  width: 80vw;
  height: 80vh;
  background-color: #2a2a2a;
  position: fixed;
  left: 10vw;
  top: 10vh;
  border-radius: 1rem;
  box-shadow: $box_shadow_regular_dark;
  z-index: 3;
}

.title {
  font-size: $font_size_big;
  font-weight: $font_weight_big;
  background-image: $background_image_regular;
  background-clip: text;
  color: transparent;
}

.content {
  margin-top: 1rem;
  text-indent: 1rem;
  font-size: $font_size_regular;
}

.global_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
</style>
