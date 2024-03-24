<template>
  <div class="card-container">
    <el-card class="cards" v-for="article in articleList" :key="article.id">
      <ArticlesCard :articleInfo="article"></ArticlesCard>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import ArticlesCard from "@/components/BlogArticles/ArticlesShow/ArticlesCard.vue"
import { ref } from "vue"
import axios from "axios"
import useRoute from "@/hooks/useRoute.ts"

const articleList = ref([])
axios.get(`${useRoute.BackEnd}/articles`).then(res => {
  articleList.value = res.data
})

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
  box-shadow: $box-shadow-hover;
}
</style>