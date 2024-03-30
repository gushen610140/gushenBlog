<template>
  <div class="user-body">

    <el-switch
      v-model="isLogin"
      class="switcher"
      size="large"
      inline-prompt
      style="--el-switch-on-color: #5B5A54; --el-switch-off-color: #443B3A"
      active-text="登录"
      inactive-text="注册"
    />

    <el-form :model="loginForm" label-width="5rem" class="form-style" v-if="isLogin">
      <div class="input-body">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.name" clearable class="input" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" show-password class="input" />
        </el-form-item>
      </div>
      
      <el-form-item class="button-body">
        <el-button @click="onSubmit" class="button">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

let isLogin = ref(true)

const loginForm = reactive({
  name: '',
  password: ''
})

const onSubmit = () => {
  console.log('submit!')
}

</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";
.user-body {
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
.switcher {
  position: absolute;
  right: 5rem;
  top: -5px;
}
</style>