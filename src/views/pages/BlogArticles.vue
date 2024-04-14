<template>
  <div class="page-body">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="leftCol">
        <ArticlesContainer></ArticlesContainer>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="rightCol">
        <RightAside></RightAside>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import RightAside from "@/views/layout/RightAside.vue"
import ArticlesContainer from "@/components/BlogArticles/ArticlesContainer.vue"
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
let leftCol = computed(() => {
  return store.state.windowSize < 1024 ? 22 : 16
})
let rightCol = computed(() => {
  return store.state.windowSize < 1024 ? 0 : 6
})

</script>

<style lang="scss" scoped>

</style>