<template>
  <div ref="headerRef" class="header_container">
    <div class="website_logo" @click="router.push('/')">
      <span>GushenBlog</span>
    </div>
    <div style="flex: 1"></div>
    <ul style="display: flex">
      <li
        v-for="navItem in navList"
        v-show="navItem.isShow"
        :key="navItem.path"
        :class="{ nav_item_selected: navItem.isSelect }"
        class="nav_item"
        @click="changePageHook(navItem.path, updateSelect)"
      >
        {{ navItem.label }}
      </li>
    </ul>
    <div style="flex: 1"></div>
    <div style="display: flex; align-items: center">
      <div
        v-if="userNicknameComputed"
        class="username"
        @click="changePageHook('/my')"
      >
        {{ userNicknameComputed }}
      </div>
      <div v-else class="login_button" @click="changePageHook('/login')">
        <span>登录 / 注册</span>
      </div>
      <img
        alt="avatar"
        src="../../static/default_avatar.svg"
        style="height: 1.8rem; cursor: pointer"
        @click="changePageHook('/my', updateSelect)"
      />
      <div ref="usermoreRef" class="usermore">
        <div class="logout" @click="logout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserInfoAPI } from "@/api/UserAPI.ts";
import { notice, noticeError } from "@/hooks/useNoticeMessageHook.ts";
import { changePageHook } from "@/hooks/useChangePageHook.ts"; // 页面初始化动作

// 页面初始化动作
onMounted(() => {
  // header 随滚动隐藏
  window.addEventListener("scroll", handleScroll);
  // 初始化高亮导航项
  updateSelect();
  // 获取用户头像和用户名
  if (localStorage.getItem("token")) {
    getUserInfoAPI()
      .then((res) => {
        userInfo.value = res.data;
      })
      .catch(() => {
        noticeError("登录状态已经过期，请重新登录");
        changePageHook("/login");
      });
  }
});

// TODO 将动态导航栏优化为静态
// 导航栏
const navList = reactive([
  {
    label: "文章",
    path: "/articles",
    isSelect: false,
    isShow: true,
  },
  {
    label: "项目",
    path: "/projects",
    isSelect: true,
    isShow: true,
  },
  {
    label: "发表",
    path: "/post",
    isSelect: false,
    isShow: false,
  },
  {
    label: "我的",
    path: "/my",
    isSelect: false,
    isShow: true,
  },
]);

// 导航项高亮处理
const router = useRouter();
const route = useRoute();

// 根据路径更新高亮的导航项
const updateSelect = () => {
  const curRoute = route.path.match(/^\/([a-zA-Z0-9\-_]+)(\/)?/)![1];
  navList.forEach((item) => {
    item.isSelect = item.path === "/" + curRoute;
  });
};

// 滚动自动隐藏 header
const headerRef = ref<HTMLDivElement | null>();
const headerStartScrollTop = ref(0);
const handleScroll = () => {
  if (headerRef.value != null) {
    let headerCurScrollTop = document.documentElement.scrollTop;
    if (headerCurScrollTop <= 50) {
      headerRef.value.style.transform = "translateY(0)";
      headerStartScrollTop.value = headerCurScrollTop;
      return;
    }
    if (headerStartScrollTop.value > headerCurScrollTop) {
      headerRef.value.style.transform = "translateY(0)";
    } else if (headerStartScrollTop.value <= headerCurScrollTop) {
      headerRef.value.style.transform = "translateY(-3rem)";
    }
    headerStartScrollTop.value = headerCurScrollTop;
  }
};

// 用户信息
const userInfo = ref<UserVO>();
const userNicknameComputed = computed(() => {
  if (userInfo.value) {
    return userInfo.value?.nickname;
  }
  return null;
});

// 退出登录
const logout = () => {
  localStorage.removeItem("token");
  userInfo.value = undefined;
  notice("退出登录");
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.header_container {
  position: fixed;
  // 元素开启 fixed 后可能会造成不透明度问题
  z-index: 1;
  width: 95vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-color: $background_color_box_dark;
  box-shadow: $box_shadow_regular_dark;
  border-radius: 1rem;
  transition: $transition_slow;
  transform: translateY(0);
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
}

.nav_item {
  font-size: $font_size_regular;
  font-weight: $font_weight_big;
  margin: 0 1rem;
  cursor: pointer;
  // 将 color 设置透明以显示背景图片
  color: transparent;
  background-image: $background_image_regular;
  background-clip: text;
  transition: $transition_slow;
  user-select: none;
  // 现代化技术 css filter (IE: ?)
  // 以此制作背景图片的透明度过渡
  // 利用极端亮度制作白色效果
  filter: brightness(2);
}

.nav_item_selected {
  filter: none;
}

.website_logo {
  background-image: $background_image_regular;
  background-clip: text;
  color: transparent;
  font-weight: $font_weight_big;
  user-select: none;
  cursor: pointer;
}

.username {
  user-select: none;
  cursor: pointer;
  margin-right: 1rem;
}

.login_button {
  user-select: none;
  cursor: pointer;
  margin-right: 1rem;
}

.usermore {
  position: absolute;
  height: 2.2rem;
  width: 6rem;
  border-radius: 0.5rem;
  right: 0;
  top: 3.5rem;
  opacity: 0;
  transition: $transition_slow;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logout {
  height: 2.2rem;
  background-color: $background_color_box_dark;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  user-select: none;
  cursor: pointer;
}
</style>
