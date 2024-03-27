<template>
  <div class="user-body">
    <el-form :model="form" label-width="5rem" class="form-style">
      <div>登录</div>
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.name" />
      </el-form-item>
      
      
      <el-form-item>
        <el-button @click="onSubmit">登录</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
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
}
.form-style {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>