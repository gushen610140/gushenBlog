<script lang="ts" setup>
import GsInputUI from "@/components/GsUI/form/GsInputUI.vue";
import { onMounted, ref } from "vue";
import { getUserInfoAPI, updateUserInfoAPI } from "@/api/UserAPI.ts";
import {
  notice,
  noticeError,
  noticeSuccess,
} from "@/hooks/useNoticeMessageHook.ts";
import { changePageHook } from "@/hooks/useRouterHook.ts";

const userUpdateInfo = ref<UserUpdateInfoVO>({
  nickname: "",
  email: "",
});

onMounted(() => {
  getUserInfoAPI()
    .then((res) => {
      userUpdateInfo.value.nickname = res.data.nickname;
      userUpdateInfo.value.email = res.data.email;
    })
    .catch(() => {
      noticeError("请先登录");
      changePageHook("/login");
    });
});

const updateProfileEvent = () => {
  updateUserInfoAPI(userUpdateInfo.value)
    .then((res) => {
      if (res.code == 200) {
        noticeSuccess(res.message);
      } else {
        noticeError(res.message);
      }
    })
    .catch(() => {
      noticeError("请先登录");
    });
};

const logoutEvent = () => {
  notice("您已退出登录");
  localStorage.removeItem("token");
  changePageHook("/articles");
};
</script>

<template>
  <div class="my_info_container">
    <div class="title">个人资料</div>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <div style="display: flex; gap: 8rem">
      <div class="input_container">
        <GsInputUI
          v-model="userUpdateInfo.email"
          :disabled="true"
          label="邮箱"
        ></GsInputUI>
        <GsInputUI v-model="userUpdateInfo.nickname" label="昵称"></GsInputUI>
        <div style="display: flex">
          <div class="update_btn" @click="updateProfileEvent">更新资料</div>
          <div class="logout_btn" @click="logoutEvent">退出登录</div>
        </div>
      </div>
      <div class="avatar_edit">
        <img
          alt="avatar"
          src="@/static/default_avatar.svg"
          style="width: 100%"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.my_info_container {
  border-radius: 1rem;
  padding: 1rem;
  background-color: $background_color_box_dark;
}

.title {
  font-size: $font_size_big;
  margin-left: 2rem;
  margin-top: 1rem;
}

.input_container {
  display: grid;
  grid-template-columns: 1fr;
  padding: 2rem;
  gap: 3rem;
}

.avatar_edit {
  margin-top: 1rem;
  width: 8rem;
}

.update_btn {
  background-color: #238636;
  text-align: center;
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: $transition_slow;
}

.update_btn:hover {
  box-shadow: 0 0 0.5rem #238636;
}

.logout_btn {
  margin-left: 2rem;
  background-color: #f85149;
  text-align: center;
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: $transition_slow;
}

.logout_btn:hover {
  box-shadow: 0 0 0.5rem #f85149;
}
</style>
