<template>
  <div class="blog-info description-container">
    <el-descriptions
        title="网站信息"
        :column="1"
    >
      <el-descriptions-item label="文章数量">
        {{ articleNums }}
      </el-descriptions-item>
      <el-descriptions-item label="运营时间">
        {{ runTime }}
      </el-descriptions-item>
      <el-descriptions-item label="我的天气">
        {{ weatherInfo }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from "vue"
import getRunTime from "@/hooks/getRunTime.ts"
import useWeather from "@/hooks/getMyWeather.ts"

let runTime = ref(getRunTime())
const {weatherInfo, getWeatherInfo} = useWeather()

let articleNums = 1

let timeInterval = null;
let weatherInterval = null;

onMounted(() => {
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
@import "@/styles/element.scss";

</style>