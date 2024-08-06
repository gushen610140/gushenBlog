<script lang="ts" setup>
import { ref } from "vue";
import GsInputFromUI from "@/components/GsUI/form/GsInputFormUI.vue";
import GsButtonLoginUI from "@/components/GsUI/form/GsButtonLoginUI.vue";
import { userLoginAPI } from "@/api/UserAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";
import { changePageHook } from "@/hooks/useChangePageHook.ts";

const userLoginVO = ref<UserLoginVO>({
  email: "",
  password: "",
});

const handleLogin = () => {
  userLoginAPI(userLoginVO.value).then((res) => {
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
  <div class="back_nav_page_btn" @click="changePageHook('/')">返回主页</div>
  <div class="login_window">
    <div style="margin-top: 4rem">
      <div class="title"><span class="title_content">用户登录</span></div>
    </div>
    <div class="input_area">
      <GsInputFromUI
        v-model="userLoginVO.email"
        label="邮箱"
        width="20rem"
      ></GsInputFromUI>
      <GsInputFromUI
        v-model="userLoginVO.password"
        label="密码"
        type="password"
        width="20rem"
      ></GsInputFromUI>
      <GsButtonLoginUI content="确认" @click="handleLogin"></GsButtonLoginUI>
    </div>
    <div class="more" style="display: flex; justify-content: center; gap: 1rem">
      <div class="register" @click="changePageHook('/register')">前往注册</div>
      <div class="forget">忘记密码</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.login_window {
  margin: 6rem auto 10rem;
  width: 60vw;
  height: 50vh;
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

.register {
  margin-top: 1rem;
  cursor: pointer;
  transition: $transition_regular;
}

.forget {
  margin-top: 1rem;
  cursor: pointer;
  transition: $transition_regular;
}

.back_nav_page_btn {
  font-size: $font_size_big;
  margin-top: 2rem;
  cursor: pointer;
}
</style>
