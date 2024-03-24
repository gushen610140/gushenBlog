<template>
  <div class="body">
    <el-form :model="form" label-width="auto" class="form">

      <el-form-item label="项目标题">
        <el-input v-model="form.title" />
      </el-form-item>
    
      <el-form-item label="项目内容">
        <el-input v-model="form.content" type="textarea" :rows="24" />
      </el-form-item>

      <el-form-item label="项目链接">
        <el-input v-model="form.link" />
      </el-form-item>

      <el-form-item>
        <el-button @click="onSubmit">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import useRoute from '@/hooks/useRoute'

const form = reactive({
  title: "",
  content: "",
  link: ""
})

const onSubmit = () => {
  axios.post(`${useRoute.BackEnd}/projects`,null, 
  { params: form }).then(res => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.body {
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}
.form {
  width: 40rem;
}
.body:deep(.el-form-item__label) {
  color: $font-color-dark;
}
.body:deep(.el-input__wrapper) {
  border: 2px solid white;
  border-radius: 0;
  box-shadow: none;
  background-color: transparent;
}
.body:deep(.el-input__inner) {
  color: $font-color-dark;
}
.body:deep(.el-textarea__inner) {
  background-color: transparent;
  box-shadow: none;
  border: 2px solid white;
  border-radius: 0;
  color: $font-color-dark;
}
.body:deep(.is-focus) {
  box-shadow: none;
  border: 2px solid;
  border-image: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%) 1;
}
.body:deep(.el-textarea__inner:focus) {
  border-image: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%) 1;
}
.body:deep(.el-form-item__content) {
  display: flex;
  justify-content: end;
}
.body:deep(.el-button) {
  background-color: transparent;
  box-shadow: none;
  border: 2px solid white;
  border-radius: 0;
  color: $font-color-dark;
}
.body:deep(.el-button:hover) {
  border-image: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%) 1;
}
</style>