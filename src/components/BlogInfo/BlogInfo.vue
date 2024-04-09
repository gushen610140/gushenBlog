<template>
  <el-descriptions
      title="网站信息"
      :column="1"
  >
    <el-descriptions-item label="项目数量">
      {{ projectCount }}
    </el-descriptions-item>

    <el-descriptions-item label="文章数量">
      {{ articleCount }}
    </el-descriptions-item>

    <el-descriptions-item label="运营时间">
      {{ runTime }}
    </el-descriptions-item>

    <el-descriptions-item label="我的天气">
      {{ weatherInfo }}
    </el-descriptions-item>

  </el-descriptions>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from "vue"
import {error} from "@/hooks/useMessage.ts";
import getRunTime from "@/hooks/getRunTime.ts"
import useWeather from "@/hooks/getMyWeather.ts"
import getArticles from "@/hooks/AsyncRequest/Article/getArticles.ts";
import getProjects from "@/hooks/AsyncRequest/Projects/getProjects.ts";

const runTime = ref(getRunTime())
const {weatherInfo, getWeatherInfo} = useWeather()

const articleCount = ref(0)
const projectCount = ref(0)
let timeInterval: any  = null;
let weatherInterval: any = null;

onMounted(() => {
  getArticles().then(res => {
    articleCount.value = res.length
  }).catch(err => {
    error(err.message)
  })

  getProjects().then(res => {
    projectCount.value = res.length
  }).catch(err => {
    error(err.message)
  })

  timeInterval = setInterval(() => {
    runTime.value = getRunTime()
  }, 1000)
  getWeatherInfo()

  weatherInterval = setInterval(() => {
    getWeatherInfo()
  }, 1000 * 3600)
})

onBeforeUnmount(() => {
  if (timeInterval)
    clearInterval(timeInterval)
  if (weatherInterval)
    clearInterval(weatherInterval)
})

</script>

<style lang="scss" scoped>
@import "@/styles/element";

</style>