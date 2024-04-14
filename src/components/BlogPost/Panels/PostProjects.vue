<template>
  <div class="container">

    <div class="title">发表项目</div>

    <el-form :model="form" class="form">

      <el-form-item label="标题">
        <el-input v-model="form.title"/>
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :rows="24"/>
      </el-form-item>

      <el-form-item label="链接">
        <el-input v-model="form.link"/>
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
import postProject from "@/hooks/AsyncRequest/Projects/postProject.ts";
import {error, success, info} from "@/hooks/useMessage.ts";

const form = reactive({
  title: "",
  content: "",
  link: ""
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
            postProject(form).then(res => {
              success(res)
            }).catch(err => {
              error(err.message)
            })
          })
          .catch(() => {
            info('已取消添加项目')
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