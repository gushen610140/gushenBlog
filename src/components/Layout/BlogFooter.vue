<template>
  <div class="blog-footer description-container">
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="20">
        <el-descriptions 
          class="infos"
          title="帮助中心"
          :column="1"
        >
          <el-descriptions-item label="版权归属" :width="1000">
            © 2009-2019 Aliyun.com 版权所有
          </el-descriptions-item>
          <el-descriptions-item label="备案信息">
            <a href="http://beian.miit.gov.cn" target="_blank">浙ICP备2023048008号-1</a>
          </el-descriptions-item>
          <el-descriptions-item label="网站说明">
            本网站仅用于学习展示
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";
@import "@/styles/variables.scss";
.blog-footer {
  width: $layout-width;
  height: 200px;
  background-color: #333;
  border-radius: 20px;
  display: flex;
  align-items: center;
}
</style>