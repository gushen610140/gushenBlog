<template>
  <div class="table-body">
    <el-form :model="userForm" label-width="5rem" class="form-style">
      <div class="input-body">
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" clearable :disabled="isDisabled" class="input" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" clearable :disabled="isDisabled" class="input" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" :disabled="isDisabled" show-password class="input" />
        </el-form-item>
      </div>
      
      <el-form-item class="button-body">
        <el-button @click="changeInfo" class="button" v-if="isDisabled">修改信息</el-button>
        <el-button @click="saveInfo" class="button" v-if="!isDisabled">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, reactive } from 'vue'
import useRoute from "@/hooks/useRoute.ts"

let isDisabled = ref(true)

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
  isDisabled.value = false
}

const saveInfo = () => {
  isDisabled.value = true
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/element.scss";

.table-body {
  display: flex;
  justify-content: center;
  position: relative;
}
.form-style {
  margin-right: 3rem;
}
.input-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  width: 15rem;
}
.button {
  position: absolute;
  right: 0;
  top: 0;
}
.button-body {
  position: relative;
}
</style>