<template>
  <div class="user-info">
    <el-popover
      :effect="'dark'"
      :width="200"
      content="点击此处查看个人信息"
      placement="top-start"
      title="提示"
      trigger="hover"
    >
      <template #reference>
        <img
          alt="头像"
          class="avatar"
          src="/userAvatars/unknown.png"
          @click="handleDrawer"
        />
      </template>
    </el-popover>
    <div v-if="isLogin" class="name">欢迎您，{{ userInfo.username }}！</div>
    <div v-if="!isLogin" class="name">请先点击左侧头像进行登录</div>
  </div>

  <el-drawer
    v-model="drawer"
    :size="drawerWidth"
    class="drawer"
    direction="rtl"
    title="个人信息"
  >
    <BlogLogin v-if="!isLogin" @triggerLogin="triggerLogin"></BlogLogin>
    <UserInfoTable v-if="isLogin" @triggerExit="triggerExit"></UserInfoTable>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import useCheckLogin from "@/hooks/useCheckLogin.ts";
import BlogLogin from "@/components/BlogUser/UserLoginTable.vue";
import UserInfoTable from "@/components/BlogUser/UserInfoTable.vue";
import useUserInfo from "@/hooks/AsyncRequest/User/useUserInfo.ts";
import UserInfo from "@/type/UserInfo.ts";
import { error } from "@/hooks/useMessage.ts";
import { useStore } from "vuex";

const showUserName = () => {
  useUserInfo()
    .then((res: UserInfo) => {
      userInfo.username = res.username;
    })
    .catch((err) => {
      error(err.message);
    });
};

const userInfo = reactive({
  username: "",
  avatar: "",
});

onMounted(() => {
  showUserName();
});

let drawer = ref(false);
let isLogin = ref(false);

useCheckLogin().then((res: boolean) => {
  isLogin.value = res;
});

const handleDrawer = () => {
  useCheckLogin().then((res: boolean) => {
    isLogin.value = res;
  });
  drawer.value = true;
};

const triggerLogin = () => {
  showUserName();
  drawer.value = false;
  isLogin.value = true;
};

const triggerExit = () => {
  drawer.value = false;
  isLogin.value = false;
};

const store = useStore();
let drawerWidth = computed(() => {
  if (store.state.windowSize > 1024) {
    return "45%";
  } else {
    return "85%";
  }
});
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
  transition: $transition_regular;
}

.avatar:hover {
  transform: scale(1.1);
}
</style>
