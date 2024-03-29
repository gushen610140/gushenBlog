<template>
  <div class="user-info">
    <el-popover
      placement="top-start"
      title="提示"
      :width="200"
      trigger="hover"
      content="点击此处查看个人信息"
      effect="dark"
    >
      <template #reference>
        <img class="avator" :src=userInfo.avator @click="drawer = true"></img>
      </template>
    </el-popover>
    <div class="name">欢迎您，{{ userInfo.username }}！</div>
  </div>

  <el-drawer
    class="drawer"
    v-model="drawer"
    title="个人信息"
    direction="rtl"
  >
    <div class="content">
      1
      <el-form>
        <el-form-item>1</el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useCheckLogin from '@/hooks/useCheckLogin.ts'

const userInfo = {
  username: '夜刀神狗',
  avator: "src/assets/Images/userAvators/userId.jpg"
}

let drawer = ref(false)

let isLogin = computed(() => useCheckLogin())
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/element.scss";
.name {
  color: $font-color-dark;
  margin-left: 3rem;
}
.user-info {
  display: flex;
  align-items: center;
}
.avator {
  width: 50px;
  border-radius: 25px;
  cursor: pointer;
  transition: $transition-regular;
}
.avator:hover {
  transform: scale(1.1);
}
</style>