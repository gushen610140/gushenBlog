<script lang="ts" setup>
import MyFuncListComp from "@/components/MyComp/MyFuncListComp.vue";
import Header from "@/components/Layout/Header.vue";
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <el-row>
    <el-col :offset="1" :span="4">
      <MyFuncListComp></MyFuncListComp>
    </el-col>
    <el-col :offset="3" :span="16">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
