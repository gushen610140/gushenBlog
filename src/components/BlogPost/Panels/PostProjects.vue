<template>
  <div class="container">
    <el-form :model="form" label-width="auto" class="form">

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
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}

.form {
  width: 45rem;
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