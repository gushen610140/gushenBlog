<script lang="ts" setup>
import { ref } from "vue";
import { Close } from "@element-plus/icons-vue";
import GsInputFromUI from "@/components/GsUI/form/GsInputFormUI.vue";
import GsButtonLoginUI from "@/components/GsUI/form/GsButtonLoginUI.vue";
import { userLoginAPI } from "@/api/UserAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";

const isShowWindow = ref(true);

const userLoginVO = ref<UserLoginVO>({
  email: "",
  password: "",
});

const handleLogin = () => {
  userLoginAPI(userLoginVO.value).then((res) => {
    if (res.code == 200) {
      localStorage.setItem("token", res.data);
      noticeSuccess(res.message);
    } else {
      noticeError(res.message);
    }
  });
};
</script>

<template>
  <Transition>
    <div v-show="isShowWindow">
      <div class="global_overlay" @click="isShowWindow = false"></div>
      <div class="login_window">
        <el-row style="margin-top: 1rem">
          <el-col :span="22"></el-col>
          <el-col :span="2">
            <el-icon
              :size="'100%'"
              style="cursor: pointer; text-align: center"
              @click="isShowWindow = false"
            >
              <Close />
            </el-icon>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"></el-col>
          <el-col :span="8" class="title"> 登录 </el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12" style="margin-top: 1.5rem">
            <GsInputFromUI
              v-model="userLoginVO.email"
              label="邮箱"
              width="100%"
            ></GsInputFromUI>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12" style="margin-top: 1.5rem">
            <GsInputFromUI
              v-model="userLoginVO.password"
              label="密码"
              type="password"
              width="100%"
            ></GsInputFromUI>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-row>
          <el-col :span="9"></el-col>
          <el-col :span="6" style="margin-top: 4rem">
            <GsButtonLoginUI
              color="#2a2a2a"
              content="确认"
              @click="handleLogin"
            ></GsButtonLoginUI>
          </el-col>
          <el-col :span="9"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="16">
            <div
              class="more"
              style="display: flex; justify-content: center; gap: 1rem"
            >
              <div class="register">前往注册</div>
              <div class="forget">忘记密码</div>
            </div>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.title {
  font-size: $font_size_big;
  font-weight: $font_weight_big;
  background-image: $background_image_regular;
  background-clip: text;
  color: transparent;
  text-align: center;
}

.login_window {
  width: 30vw;
  height: 50vh;
  background-color: #2a2a2a;
  position: fixed;
  left: 35vw;
  top: 20vh;
  border-radius: 1rem;
  box-shadow: $box_shadow_regular_dark;
  z-index: 2;
}

.global_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.register {
  margin-top: 3rem;
  color: #5b5a54;
  cursor: pointer;
  transition: $transition_regular;
}

.register:hover {
  color: #ffff;
}

.forget {
  margin-top: 3rem;
  color: #5b5a54;
  cursor: pointer;
  transition: $transition_regular;
}

.forget:hover {
  color: #ffff;
}

// 登录窗口出现动画
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
