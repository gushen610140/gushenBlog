<template>
  <div>
    <el-form :model="userForm" label-width="5rem" class="form-style">
      <div class="input-body">
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" clearable disabled class="input" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" clearable disabled class="input" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" disabled show-password class="input" />
        </el-form-item>
      </div>
      
      <el-form-item class="button-body">
        <el-button @click="changeInfo" class="button">修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, reactive } from 'vue'
import useRoute from "@/hooks/useRoute.ts"

const userForm = reactive({
  email: '',
  username: '',
  password: ''
})

axios.get(`${useRoute.BackEnd}/user`, {
  params: {
    token: localStorage.getItem('token')
  }
}).then(res => {
  if (res.data.status === 200) {
    const userInfo = JSON.parse(res.data.message)
    userForm.email = userInfo.email
    userForm.username = userInfo.username
    userForm.password = userInfo.password
  }
})

const changeInfo = () => {
  console.log('changeInfo')
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/element.scss";
</style>