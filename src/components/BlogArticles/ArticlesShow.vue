<template>
  <div class="card-container">
    <el-card class="cards" v-for="article in articleList" :key="article.id" @click="handleClick(article.id)">
      <ArticlesCard :articleInfo="article"></ArticlesCard>
    </el-card>
  </div>
  <el-drawer
    class="drawer"
    v-model="drawer"
    :title="selectedArticle.title"
    direction="ltr"
  >
    <div class="content">
      {{ selectedArticle.content }}
    </div>
    <el-icon 
      class="delete" 
      :size="20" 
      @click="deleteArticle(selectedArticle.id)" 
    >
      <Delete />
    </el-icon>
  </el-drawer>
</template>

<script setup lang="ts">
import ArticlesCard from "@/components/BlogArticles/ArticlesShow/ArticlesCard.vue"
import { ref } from "vue"
import axios from "axios"
import useRoute from "@/hooks/useRoute.ts"
import { ElMessageBox, ElMessage } from "element-plus"
import useCheckLogin from "@/hooks/useCheckLogin.ts"

const articleList = ref([])
axios.get(`${useRoute.BackEnd}/articles`).then(res => {
  articleList.value = res.data
})

let drawer = ref(false)
let selectedArticle = ref({})

const handleClick = (id) => {
  useCheckLogin().then((res) => {
    if (res) {
      drawer.value = res
      selectedArticle.value = articleList.value.find(article => article.id === id)
    } else {
      ElMessage({
        type: 'error',
        message: '请先登录'
      })
    }
  })
}

const deleteArticle = (id) => {
  ElMessageBox.confirm(
    `文章 ${selectedArticle.value.title} 将被删除，是否继续? `, 
    '提示', 
    {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.delete(`${useRoute.BackEnd}/articles`, {params: {id}})
    .then(res => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      articleList.value = articleList.value.filter(article => article.id !== id)
      drawer.value = false
      selectedArticle.value = {}
    }).catch(err => {
      ElMessage({
        type: 'error',
        message: '抱歉，出了点问题，请稍后再试'
      })
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    })
  })
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/element.scss";
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
.delete {
  position: absolute;
  right: 2rem;
  margin-top: 4rem;
  cursor: pointer;
}
.drawer {
  position: relative;
}
</style>