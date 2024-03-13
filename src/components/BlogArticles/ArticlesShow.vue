<template>
  <div class="card-container">
    <el-card class="cards" v-for="article in articleList" :key="article.id">
      <ArticlesCard :articleInfo="article"></ArticlesCard>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import ArticlesCard from "@/components/BlogArticles/ArticlesShow/ArticlesCard.vue"

const articleList = [
  {
    id: 1,
    title: "捏妈",
    content: "不想上课了"
  },
  {
    id: 2,
    title: "中国近代史",
    content: "真是一场酣畅淋漓的赤石啊"
  },
  {
    id: 3,
    title: "我为什么不想上晚自习",
    content: "疲劳和精力不足： 下午的学习可能已经消耗了我大部分的精力，到了晚上可能感觉非常疲劳，难以集中精力继续学习。需要休息和放松： 晚上也是我放松和休息的时间，可能我需要时间来放松一下，准备好第二天的学习和活动。效率问题： 对于一些人来说，晚上的学习效率可能不如白天高。如果我觉得在晚上学习效率低下，可能会选择等到第二天早上或其他时间学习。身体健康问题： 晚上过于晚的学习可能会影响我的睡眠质量和身体健康。保持规律的作息对于身体和学习都很重要。"
  },
  {
    id: 4,
    title: "我为什么晨点打卡",
    content: "同上"
  },
  {
    id: 5,
    title: "无敌了",
    content: "复活牢大"
  }
]

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  margin-top: 40px;
  margin-bottom: 40px;
}
.cards {
  border: none;
  background-color: $box-background-color-dark;
  cursor: pointer;
}
.cards:hover {
  box-shadow: 0 0 5px $font-color-dark;
}
</style>