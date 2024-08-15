<script lang="ts" setup>
import MyFuncListComp from "@/components/MyComp/MyFuncListComp.vue";
import Header from "@/components/LayoutComp/Header.vue";
import { useWindowSizeStore } from "@/store";

const store = useWindowSizeStore();

const useColProperty = () => {
  const myPanelColSpan = store.isMobile ? 24 : 16;
  const myPanelColOffset = store.isMobile ? 0 : 1;

  return {
    myPanelColSpan,
    myPanelColOffset,
  };
};

const { myPanelColSpan, myPanelColOffset } = useColProperty();
</script>

<template>
  <Header></Header>
  <el-row style="height: 6rem"></el-row>
  <el-row>
    <el-col v-show="!store.isMobile" :offset="1" :span="5">
      <MyFuncListComp></MyFuncListComp>
    </el-col>
    <el-col :offset="myPanelColOffset" :span="myPanelColSpan">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
