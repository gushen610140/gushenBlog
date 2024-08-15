<script lang="ts" setup>
import { ref } from "vue";
import GsInputFromUI from "@/components/GsUI/form/GsInputFormUI.vue";
import GsInputFormUI from "@/components/GsUI/form/GsInputFormUI.vue";
import GsButtonLoginUI from "@/components/GsUI/form/GsButtonLoginUI.vue";
import { changePageHook } from "@/hooks/useRouterHook.ts";
import { sendCodeAPI } from "@/api/MailAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";
import { userRegisterAPI } from "@/api/UserAPI.ts";
import { useWindowSizeStore } from "@/store";

const userRegisterVO = ref<UserRegisterVO>({
  email: "",
  nickname: "",
  password: "",
  again_password: "",
  verify_code: "",
});

const store = useWindowSizeStore();

const sendCodeEvent = () => {
  sendCodeAPI(userRegisterVO.value.email).then((res) => {
    if (res.data) {
      noticeSuccess("验证码发送成功，请查看您的邮箱");
    } else {
      noticeError("请填写正确的邮箱");
    }
  });
};

const registerEvent = () => {
  userRegisterAPI(userRegisterVO.value).then((res) => {
    if (res.code == 200) {
      localStorage.setItem("token", res.data);
      noticeSuccess(res.message);
      changePageHook("/articles");
    } else {
      noticeError(res.message);
    }
  });
};
</script>

<template>
  <v-icon
    class="mt-4 ml-2 back_icon"
    icon="mdi-undo-variant"
    size="40"
    @click="changePageHook('/login')"
  ></v-icon>
  <div :class="{ register_window_mobile: store.isMobile }" class="register_window">
    <div style="margin-top: 4rem">
      <div class="title"><span class="title_content">用户注册</span></div>
    </div>
    <div class="input_area">
      <GsInputFromUI v-model="userRegisterVO.email" label="邮箱" width="20rem"></GsInputFromUI>
      <div style="width: 20rem; display: flex; gap: 1rem">
        <GsInputFromUI
          v-model="userRegisterVO.verify_code"
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
      <GsInputFormUI v-model="userRegisterVO.nickname" label="昵称" width="20rem"></GsInputFormUI>
      <GsInputFromUI
        v-model="userRegisterVO.password"
        label="密码"
        type="password"
        width="20rem"
      ></GsInputFromUI>
      <GsInputFromUI
        v-model="userRegisterVO.again_password"
        label="确认密码"
        type="password"
        width="20rem"
      ></GsInputFromUI>
      <GsButtonLoginUI content="注册" @click="registerEvent"></GsButtonLoginUI>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.register_window {
  margin: 10vh auto 10vh;
  width: 60vw;
  height: 70vh;
  background-color: #2a2a2a;
  border-radius: 1rem;
  box-shadow: $box_shadow_vivid;
  // 启动 BFC
  overflow: hidden;
}

.register_window_mobile {
  margin-top: 3vh;
  margin-bottom: 3vh;
  width: 90vw;
  height: auto;
  box-shadow: none;
  background-color: transparent;
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

.back_icon {
  transition: $transition_slow;
}

.back_icon:hover {
  text-shadow: $box_shadow_regular_light;
  transform: scale(1.1);
}
</style>
