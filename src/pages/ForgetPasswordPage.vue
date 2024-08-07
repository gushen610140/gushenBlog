<script lang="ts" setup>
import { ref } from "vue";
import GsInputFromUI from "@/components/GsUI/form/GsInputFormUI.vue";
import GsButtonLoginUI from "@/components/GsUI/form/GsButtonLoginUI.vue";
import { changePageHook } from "@/hooks/useChangePageHook.ts";
import { sendCodeAPI } from "@/api/MailAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";
import { userResetPasswordAPI } from "@/api/UserAPI.ts";

const userForgetPasswordVO = ref<UserForgetPasswordVO>({
  email: "",
  new_password: "",
  again_password: "",
  verify_code: "",
});

const sendCodeEvent = () => {
  if (userForgetPasswordVO.value.email == "") {
    noticeError("请先填写邮箱");
    return;
  }
  sendCodeAPI(userForgetPasswordVO.value.email).then((res) => {
    if (res.data) {
      noticeSuccess("验证码发送成功，请查看您的邮箱");
    } else {
      noticeError("请填写正确的邮箱");
    }
  });
};

const resetPasswordEvent = () => {
  if (
    userForgetPasswordVO.value.email == "" ||
    userForgetPasswordVO.value.new_password == "" ||
    userForgetPasswordVO.value.again_password == "" ||
    userForgetPasswordVO.value.verify_code == ""
  ) {
    noticeError("请先填写完整信息");
    return;
  }
  if (
    userForgetPasswordVO.value.new_password !=
    userForgetPasswordVO.value.again_password
  ) {
    noticeError("两次密码不一致");
    return;
  }
  userResetPasswordAPI(userForgetPasswordVO.value).then((res) => {
    if (res.data) {
      noticeSuccess(res.message);
      changePageHook("/login");
    } else {
      noticeError(res.message);
    }
  });
};
</script>

<template>
  <div class="back_nav_page_btn" @click="changePageHook('/login')">
    返回登录
  </div>
  <div class="forget_password_window">
    <div style="margin-top: 4rem">
      <div class="title"><span class="title_content">忘记密码</span></div>
    </div>
    <div class="input_area">
      <GsInputFromUI
        v-model="userForgetPasswordVO.email"
        label="邮箱"
        width="20rem"
      ></GsInputFromUI>
      <div style="width: 20rem; display: flex; gap: 1rem">
        <GsInputFromUI
          v-model="userForgetPasswordVO.verify_code"
          label="验证码"
          width="12rem"
        ></GsInputFromUI>
        <GsButtonLoginUI
          content="发送验证码"
          font_size="0.9rem"
          width="7rem"
          @click="sendCodeEvent"
        ></GsButtonLoginUI>
      </div>
      <GsInputFromUI
        v-model="userForgetPasswordVO.new_password"
        label="新密码"
        type="password"
        width="20rem"
      ></GsInputFromUI>
      <GsInputFromUI
        v-model="userForgetPasswordVO.again_password"
        label="确认新密码"
        type="password"
        width="20rem"
      ></GsInputFromUI>
      <GsButtonLoginUI
        content="重置密码"
        @click="resetPasswordEvent"
      ></GsButtonLoginUI>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.forget_password_window {
  margin: 5rem auto 10rem;
  width: 60vw;
  height: 60vh;
  background-color: #2a2a2a;
  border-radius: 1rem;
  box-shadow: $box_shadow_vivid;
  // 启动 BFC
  overflow: hidden;
}

.input_area {
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
}

.title {
  font-size: $font_size_big;
  font-weight: $font_weight_big;
  color: transparent;
  text-align: center;
  .title_content {
    background-image: $background_image_regular;
    background-clip: text;
    user-select: none;
  }
}

.back_nav_page_btn {
  font-size: $font_size_big;
  margin-top: 2rem;
  cursor: pointer;
}
</style>
