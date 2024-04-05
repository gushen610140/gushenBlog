<template>
  <div class="user-info">
    <el-popover
        placement="top-start"
        title="提示"
        :width="200"
        trigger="hover"
        content="点击此处查看个人信息"
        :effect="'dark'"
    >
      <template #reference>
        <img class="avatar" src="/userAvatars/1774342760620937218.jpg" @click="handleDrawer" alt="头像">
      </template>
    </el-popover>
    <div v-if="isLogin" class="name">欢迎您，{{ userInfo.username }}！</div>
    <div v-if="!isLogin" class="name">请先点击左侧头像进行登录</div>
  </div>

  <el-drawer
      class="drawer"
      v-model="drawer"
      title="个人信息"
      direction="rtl"
  >
    <BlogLogin @triggerLogin="triggerLogin" v-if="!isLogin"></BlogLogin>
    <UserInfoTable @triggerExit="triggerExit" v-if="isLogin"></UserInfoTable>
  </el-drawer>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import useCheckLogin from '@/hooks/useCheckLogin.ts'
import BlogLogin from '@/components/BlogUser/BlogLogin.vue'
import UserInfoTable from '@/components/BlogUser/UserInfoTable.vue'
import useRoute from '@/hooks/useRoute.ts'
import axios from 'axios'

const userInfo = reactive({
  username: '夜刀神狗',
  avatar: ""
})

let token = localStorage.getItem('token')
if (token) {
  axios.get(`${useRoute.BackEnd}/user`, {
    params: {
      token: localStorage.getItem('token')
    }
  }).then(res => {
    if (res.data.status === 200) {
      const userData = JSON.parse(res.data.message)
      userInfo.username = userData.username
    }
  })
}


let drawer = ref(false)
let isLogin = ref(false)

useCheckLogin().then((res: boolean) => {
  isLogin.value = res;
})

const handleDrawer = () => {
  useCheckLogin().then((res: boolean) => {
    isLogin.value = res;
  })
  drawer.value = true
}

const triggerLogin = () => {
  drawer.value = false
  isLogin.value = true
}

const triggerExit = () => {
  drawer.value = false
  isLogin.value = false
}

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

.avatar {
  width: 50px;
  border-radius: 25px;
  cursor: pointer;
  transition: $transition-regular;
}

.avatar:hover {
  transform: scale(1.1);
}
</style>