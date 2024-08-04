<script lang="ts" setup>
import MyInfoComp from "@/components/MyComp/MyInfoComp.vue";
import MyFuncListComp from "@/components/MyComp/MyFuncListComp.vue";
import Header from "@/components/Layout/Header.vue";
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <el-row>
    <el-col :span="1"></el-col>
    <el-col :span="4">
      <MyFuncListComp></MyFuncListComp>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="18">
      <MyInfoComp></MyInfoComp>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
