<template>
  <div class="container">

    <div class="title">发表文章</div>

    <el-form :model="form" class="form">

      <el-form-item label="标题">
        <el-input v-model="form.title"/>
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :rows="24"/>
      </el-form-item>

      <el-form-item class="button-container">
        <el-button @click="onSubmit" class="button">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {ElMessageBox} from 'element-plus'
import useCheckLogin from '@/hooks/useCheckLogin.ts'
import {error, success, info} from "@/hooks/useMessage.ts";
import postArticle from "@/hooks/AsyncRequest/Article/postArticle.ts";

const form = reactive({
  title: "",
  content: "",
})

const onSubmit = () => {
  useCheckLogin().then(res => {
    if (res) {
      ElMessageBox.confirm(
          `是否确认要添加项目? `,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            postArticle(form).then(res => {
              success(res)
            }).catch(err => {
              error(err.message)
            })
          })
          .catch(() => {
            info('已取消添加文章')
          })
    } else {
      error('请先进行登录')
    }
  })
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/element";

.container {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}

.title {
  margin-bottom: 1rem;
  font-size: $font-size-title-small;
}

.form {
  width: 80%;
}

.button-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.button {
  position: absolute;
  right: 0;
}
</style>