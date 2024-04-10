<template>
  <div class="container">
    <div
        class="cards"
        v-for="article in articleList"
        :key="article.id"
        @click="handleClick(article)"
    >
      <ArticlesCard :articleInfo="article"></ArticlesCard>
    </div>
    <el-drawer
        class="drawer"
        v-model="drawer"
        :title="clickedArticle.title"
        direction="ltr"
    >
      <div class="content">
        {{ clickedArticle.content }}
      </div>
      <el-icon
          class="delete"
          :size="20"
          @click="removeArticle"
      >
        <Delete/>
      </el-icon>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import ArticlesCard from "@/components/BlogArticles/ArticlesCard.vue"
import {onMounted, ref} from "vue"
import {ElMessageBox} from "element-plus"
import useCheckLogin from "@/hooks/useCheckLogin.ts"
import {Delete} from "@element-plus/icons-vue";
import ArticleInfo from "@/type/ArticleInfo.ts";
import useArticlesInfo from "@/hooks/AsyncRequest/Article/getArticles.ts";
import deleteArticle from "@/hooks/AsyncRequest/Article/deleteArticle.ts"
import {error, success, info} from "@/hooks/useMessage.ts";
import ResponseInfo from "@/type/ResponseInfo.ts";

let drawer = ref(false)
const articleList = ref<ArticleInfo[]>([])
const clickedArticle = ref<ArticleInfo>({
  id: '0',
  title: 'error',
  content: 'error'
})

onMounted(() => {
  useArticlesInfo().then((res: ArticleInfo[]) => {
    articleList.value = res
  }).catch(err => {
    error(err.message)
  })
})

const handleClick = (article: ArticleInfo) => {
  useCheckLogin().then(res => {
    if (res) {
      drawer.value = res
      clickedArticle.value = article
    } else {
      error('您必须先进行登录才可以查看文章')
    }
  })
}

const removeArticle = () => {
  ElMessageBox.confirm(
      `文章 ${clickedArticle.value.title} 将被删除，是否继续? `,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        deleteArticle(clickedArticle.value.id).then((res: ResponseInfo) => {
          if (res.status == 200) {
            success(res.message)
            articleList.value = articleList.value.filter(article => article.id !== clickedArticle.value.id)
            drawer.value = false
          } else if (res.status == 401 || res.status == 402) {
            error(res.message)
            drawer.value = false
          }
        }).catch(err => {
          error(err.message)
        })
      })
      .catch(() => {
        info('已取消删除')
      })
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.container {
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
  transition: $transition-slow;
}

.cards:hover {
  box-shadow: $box-shadow-border-light;
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