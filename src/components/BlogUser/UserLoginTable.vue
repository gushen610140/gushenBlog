<template>
  <div class="user-body">

    <el-switch
        v-model="isLogin"
        class="switcher"
        :class="{switcherPhone: switcherPhone}"
        size="large"
        inline-prompt
        style="--el-switch-on-color: #5B5A54; --el-switch-off-color: #443B3A"
        active-text="登录"
        inactive-text="注册"
    />

    <el-form :model="loginForm" label-width="5rem" class="form-style" v-if="isLogin">
      <div class="input-body">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.name" clearable class="input"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" show-password class="input"/>
        </el-form-item>
      </div>

      <el-form-item class="button-body">
        <el-button @click="onLogin" class="button">登录</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="registerForm" label-width="5rem" class="form-style" v-if="!isLogin">
      <div class="input-body">
        <el-form-item label="邮箱">
          <el-input v-model="registerForm.email" clearable class="input"/>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="registerForm.code" clearable disabled class="input"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="registerForm.name" clearable class="input"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerForm.password" show-password class="input"/>
        </el-form-item>
      </div>

      <el-form-item class="button-body">
        <el-button @click="onRegister" class="button">注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import {computed, reactive, ref} from 'vue'
import useRoute from "@/hooks/useRoute.ts"
import {ElMessage} from 'element-plus'
import {useStore} from "vuex";

let isLogin = ref(true)

const emit = defineEmits(['triggerLogin'])

const loginForm = reactive({
  name: '',
  password: ''
})

const registerForm = reactive({
  email: '',
  code: '',
  name: '',
  password: ''
})

const store = useStore()
let switcherPhone = computed(() => {
  return store.state.windowSize < 1024
})

// 登录
const onLogin = () => {
  axios.get(`${useRoute.BackEnd}/login`, {
    params: {
      username: loginForm.name,
      password: loginForm.password
    }
  }).then(res => {
    if (res.data.status === 200) {
      localStorage.setItem('token', res.data.message)
      ElMessage({
        type: 'success',
        message: "登录成功"
      })
      emit('triggerLogin')
    } else if (res.data.status) {
      ElMessage({
        type: 'error',
        message: res.data.message
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: "出了点错误，请稍后再试"
    })
  })
}

const onRegister = () => {
  axios.post(`${useRoute.BackEnd}/register`,
      null,
      {
        params: {
          username: registerForm.name,
          password: registerForm.password,
          email: registerForm.email
        },
        withCredentials: true
      }).then(res => {
    if (res.data.status === 200) {
      ElMessage({
        type: 'success',
        message: res.data.message
      })
      isLogin.value = true
    } else if (res.data.status) {
      ElMessage({
        type: 'error',
        message: res.data.message
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: "出了点错误，请稍后再试"
    })
  })
}

</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.user-body {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 2rem;
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

.switcher {
  position: absolute;
  right: 10rem;
  top: -3rem;
  z-index: 1;
}

.switcherPhone {
  position: absolute;
  left: 1rem;
  top: -3rem;
  z-index: 1;
}

</style>