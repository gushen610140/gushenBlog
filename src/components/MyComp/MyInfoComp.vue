<script lang="ts" setup>
import GsInputUI from "@/components/GsUI/form/GsInputUI.vue";
import { onMounted, Ref, ref } from "vue";
import {
  getUserInfoAPI,
  updateAvatarAPI,
  updateUserInfoAPI,
  uploadAvatarAPI,
} from "@/api/UserAPI.ts";
import { notice, noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";
import { changePageHook, reloadPage } from "@/hooks/useRouterHook.ts";

const userAvatar = ref<string>("");
const userUpdateInfo = ref<UserUpdateInfoVO>({
  nickname: "",
  email: "",
});

const userUpdateAvatar = ref<File | null>(null);

onMounted(() => {
  getUserInfoAPI()
    .then((res) => {
      userUpdateInfo.value.nickname = res.data.nickname;
      userUpdateInfo.value.email = res.data.email;
      userAvatar.value = res.data.avatar;
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
        reloadPage();
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

const updateAvatarEvent = (isActive: Ref<boolean>) => {
  if (userUpdateAvatar.value == null) {
    noticeError("请先选择图片");
    return;
  }
  const formData = new FormData();
  formData.append("file", userUpdateAvatar.value);
  uploadAvatarAPI(formData).then((avatarUrlRes) => {
    updateAvatarAPI(avatarUrlRes.data).then((res) => {
      if (res.data) {
        userAvatar.value = avatarUrlRes.data;
        isActive.value = false;
        userUpdateAvatar.value = null;
        noticeSuccess(res.message);
        reloadPage();
      } else {
        noticeError(res.message);
      }
    });
  });
};
</script>

<template>
  <div class="my_info_container">
    <div class="title">个人资料</div>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <div style="display: flex; gap: 4rem">
      <div class="input_container">
        <GsInputUI v-model="userUpdateInfo.email" :disabled="true" label="邮箱"></GsInputUI>
        <GsInputUI v-model="userUpdateInfo.nickname" label="昵称"></GsInputUI>
        <div style="display: flex">
          <div class="update_btn" @click="updateProfileEvent">更新资料</div>
          <div class="logout_btn" @click="logoutEvent">退出登录</div>
        </div>
      </div>
      <div class="container flex items-center justify-start h-48 relative">
        <v-avatar :image="userAvatar" size="150"></v-avatar>
        <v-dialog max-width="400" theme="dark">
          <template v-slot:activator="{ props }">
            <div class="absolute -left-4 bottom-4">
              <v-btn
                prepend-icon="mdi-pencil"
                size="small"
                text="编辑"
                theme="dark"
                v-bind="props"
              ></v-btn>
            </div>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-title>上传头像</v-card-title>
              <v-card-text>
                <v-file-input
                  v-model="userUpdateAvatar"
                  label="上传头像"
                  prepend-icon="mdi-camera"
                  show-size
                ></v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-btn text="取消" @click="isActive.value = false"></v-btn>
                <v-btn
                  color="blue"
                  text="确认"
                  variant="flat"
                  @click="updateAvatarEvent(isActive)"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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
