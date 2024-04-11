<template>
  <div class="page-body">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="leftCol">
        <ProjectsContainer></ProjectsContainer>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="rightCol">
        <RightAside></RightAside>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ProjectsContainer from "@/components/BlogProjects/ProjectsContainer.vue"
import RightAside from "@/views/layout/RightAside.vue"
import {computed} from "vue";
import {useStore} from "vuex";

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