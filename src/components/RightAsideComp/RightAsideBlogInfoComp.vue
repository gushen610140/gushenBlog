<template>
  <div class="blog_info_container">
    <div class="text-center">网站信息</div>
    <ul class="list-none">
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
import getRunTime from "@/hooks/useRunTimeHook.ts";
import useWeather from "@/hooks/useMyWeatherHook.ts";
import { getArticleCountAPI } from "@/api/ArticleAPI.ts";
import { getProjectCountAPI } from "@/api/ProjectAPI.ts";

const runTime = ref(getRunTime());
const { weatherInfo, getWeatherInfo } = useWeather();

const articleCount = ref(0);
const projectCount = ref(0);
let timeInterval: any = null;
let weatherInterval: any = null;

onMounted(() => {
  getArticleCountAPI()
    .then((res) => {
      articleCount.value = res.data;
    })
    .catch((err) => {
      noticeError(err.message);
    });

  getProjectCountAPI()
    .then((res) => {
      projectCount.value = res.data;
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
  background-color: $background_color_box_dark;
  transition: $transition_slow;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  line-height: $line_height_big;
  color: $font_color_white;
}

.blog_info_container:hover {
  box-shadow: $box_shadow_regular_light;
}
</style>
