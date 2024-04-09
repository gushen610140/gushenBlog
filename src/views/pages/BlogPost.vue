<template>
  <el-row>
    <el-col :span="1"></el-col>
    <el-col :span="4">
      <ControllerLeft></ControllerLeft>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="17">
      <PanelRight></PanelRight>
    </el-col>
    <el-col :span="1">
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ControllerLeft from "@/components/BlogPost/PostController.vue"
import PanelRight from "@/components/BlogPost/PostPanel.vue"
</script>

<style lang="scss" scoped>

</style>