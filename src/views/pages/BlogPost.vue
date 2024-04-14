<template>
  <el-row>

  </el-row>
  <el-row>
    <el-col :span="1"></el-col>
    <el-col :span="leftCol">
      <ControllerLeft></ControllerLeft>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="rightCol">
      <PanelRight></PanelRight>
    </el-col>
    <el-col :span="1">
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ControllerLeft from "@/components/BlogPost/PostController.vue"
import PanelRight from "@/components/BlogPost/PostPanel.vue"
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
let leftCol = computed(() => {
  return store.state.windowSize < 1024 ? 0 : 4
})
let rightCol = computed(() => {
  return store.state.windowSize < 1024 ? 21 : 17
})

</script>

<style lang="scss" scoped>

</style>