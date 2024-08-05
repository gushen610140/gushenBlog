<template>
  <div class="blog-footer">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="21">
        <el-descriptions :column="1" class="infos" title="帮助中心">
          <el-descriptions-item :width="1000" label="版权归属">
            © 2009-2019 Aliyun.com 版权所有
          </el-descriptions-item>
          <el-descriptions-item label="备案信息">
            <a href="https://beian.miit.gov.cn" target="_blank"
              >浙ICP备2023048008号-1</a
            >
          </el-descriptions-item>
          <el-descriptions-item label="网站说明">
            本网站仅用于学习展示
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/styles/variables";

.blog-footer {
  width: $layout_width;
  background-color: #333;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.infos {
  margin-top: 1rem;
}
</style>
