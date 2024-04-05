<template>
  <div class="table-body">
    <el-form :model="userForm" label-width="5rem" class="form-style">
      <div class="input-body">
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" clearable :disabled="isDisabled" class="input"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" clearable :disabled="isDisabled" class="input"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" :disabled="isDisabled" show-password class="input"/>
        </el-form-item>
      </div>

      <el-form-item class="button-body">
        <el-button @click="changeInfo" class="button-modify" v-if="isDisabled">修改信息</el-button>
        <el-button @click="exitLogin" class="button-exit" v-if="isDisabled">退出登录</el-button>
        <el-button @click="cancelChange" class="button-cancel" v-if="!isDisabled">取消</el-button>
        <el-button @click="saveInfo" class="button-save" v-if="!isDisabled">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import {ref, reactive} from 'vue'
import useRoute from "@/hooks/useRoute.ts"
import {ElMessage} from "element-plus";

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
  axios.put(`${useRoute.BackEnd}/user`,
      null,
      {
        params: {
          token: localStorage.getItem('token'),
          email: userForm.email,
          username: userForm.username,
          password: userForm.password
        }
      }
  ).then(res => {
    if (res.data.status === 200) {
      ElMessage({
        type: 'success',
        message: res.data.message
      })
    } else {
      ElMessage({
        type: 'success',
        message: res.data.message
      })
    }
  }).catch(err => {
    console.log(err)
  })
  isDisabled.value = true
}

const cancelChange = () => {
  isDisabled.value = true
  ElMessage({
    type: 'info',
    message: '已取消修改'
  })
}

const emit = defineEmits(['triggerExit'])
const exitLogin = () => {
  localStorage.removeItem('token')
  ElMessage({
    type: 'info',
    message: '已退出登录'
  })
  emit('triggerExit')
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

.button-modify {
  position: absolute;
  right: 0;
  top: 0;
}

.button-exit {
  position: absolute;
  right: 7rem;
  top: 0;
}

.button-save {
  position: absolute;
  right: 0;
  top: 0;
}

.button-cancel {
  position: absolute;
  right: 5rem;
  top: 0;
}

.button-body {
  position: relative;
}
</style>