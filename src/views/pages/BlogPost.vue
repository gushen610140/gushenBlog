<template>
  <div class="page-body">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <ControllerLeft></ControllerLeft>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="16">
        <PanelRight></PanelRight>
      </el-col>
      <el-col :span="1">
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ControllerLeft from "@/components/BlogMe/ControllerLeft.vue"
import PanelRight from "@/components/BlogMe/PanelRight.vue"
</script>

<style lang="scss" scoped>

</style>