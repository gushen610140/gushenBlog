<script lang="ts" setup>
import GsInputUI from "@/components/GsUI/form/GsInputUI.vue";
import { ref } from "vue";
import GsButtonLoginUI from "@/components/GsUI/form/GsButtonLoginUI.vue";
import { sendCodeByTokenAPI } from "@/api/MailAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";
import { userChangePasswordAPI } from "@/api/UserAPI.ts";
import { changePageHook } from "@/hooks/useChangePageHook.ts";

const userChangePasswordVO = ref<UserChangePasswordVO>({
  old_password: "",
  new_password: "",
  again_password: "",
  verify_code: "",
});

const sendCodeEvent = () => {
  sendCodeByTokenAPI().then((res) => {
    if (res.data) {
      noticeSuccess("验证码发送成功，请查看您的邮箱");
    } else {
      noticeError("请填写正确的邮箱");
    }
  });
};

const updatePasswordEvent = () => {
  if (
    userChangePasswordVO.value.old_password == "" ||
    userChangePasswordVO.value.new_password == "" ||
    userChangePasswordVO.value.again_password == "" ||
    userChangePasswordVO.value.verify_code == ""
  ) {
    noticeError("请填写完整信息");
  } else if (
    userChangePasswordVO.value.new_password !==
    userChangePasswordVO.value.again_password
  ) {
    noticeError("两次输入的密码不一致");
  } else {
    userChangePasswordAPI(userChangePasswordVO.value).then((res) => {
      if (res.data) {
        noticeSuccess(res.message);
        changePageHook("/my");
      } else {
        noticeError(res.message);
      }
    });
  }
};
</script>

<template>
  <div class="change_password_container">
    <div class="title">更改密码</div>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <div class="input_container">
      <GsInputUI
        v-model="userChangePasswordVO.old_password"
        label="原密码"
      ></GsInputUI>
      <GsInputUI
        v-model="userChangePasswordVO.new_password"
        label="新密码"
      ></GsInputUI>
      <GsInputUI
        v-model="userChangePasswordVO.again_password"
        label="重复新密码"
      ></GsInputUI>
      <div style="width: 20rem; display: flex; gap: 1rem">
        <GsInputUI
          v-model="userChangePasswordVO.verify_code"
          label="验证码"
          width="12rem"
        ></GsInputUI>
        <GsButtonLoginUI
          content="发送验证码"
          font_size="0.9rem"
          width="7rem"
          @click="sendCodeEvent"
        ></GsButtonLoginUI>
      </div>
      <div class="update_btn" @click="updatePasswordEvent">更改密码</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.change_password_container {
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
</style>
