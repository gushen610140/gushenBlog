<template>
  <div class="blog_info_container">
    <div style="text-align: center">网站信息</div>
    <ul>
      <li>
        <span>项目数量： {{ projectCount }}</span>
      </li>
      <li>
        <span>文章数量： {{ articleCount }}</span>
      </li>
      <li>
        <span>运营时间： {{ runTime }}</span>
      </li>
      <li>
        <span>我的天气： {{ weatherInfo }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { noticeError } from "@/hooks/useNoticeMessageHook.ts";
import getRunTime from "@/hooks/getRunTime.ts";
import useWeather from "@/hooks/getMyWeather.ts";
import { getArticleListAPI } from "@/api/ArticleAPI.ts";
import { getProjectListAPI } from "@/api/ProjectAPI.ts";

const runTime = ref(getRunTime());
const { weatherInfo, getWeatherInfo } = useWeather();

const articleCount = ref(0);
const projectCount = ref(0);
let timeInterval: any = null;
let weatherInterval: any = null;

onMounted(() => {
  getArticleListAPI()
    .then((res) => {
      articleCount.value = res.data.length;
    })
    .catch((err) => {
      noticeError(err.message);
    });

  getProjectListAPI()
    .then((res) => {
      projectCount.value = res.data.length;
    })
    .catch((err) => {
      noticeError(err.message);
    });

  timeInterval = setInterval(() => {
    runTime.value = getRunTime();
  }, 1000);
  getWeatherInfo();

  weatherInterval = setInterval(() => {
    getWeatherInfo();
  }, 1000 * 3600);
});

onBeforeUnmount(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (weatherInterval) clearInterval(weatherInterval);
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.blog_info_container {
  padding: 1rem;
  height: 10rem;
  background-color: $background_color_box_dark;
  transition: $transition_slow;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  line-height: $line_height_big;
  color: $color_small;
}

.blog_info_container:hover {
  box-shadow: $box_shadow_regular_light;
}
</style>
