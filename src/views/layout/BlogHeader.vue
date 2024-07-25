<template>
  <div ref="header" class="header">
    <ul style="display: flex">
      <li
        v-for="navItem in navList"
        :key="navItem.path"
        :class="{ nav_item_selected: navItem.isSelect }"
        class="nav_item"
        @click="changePage(navItem.path)"
      >
        {{ navItem.label }}
      </li>
    </ul>
    <div style="flex-grow: 1"></div>
    <el-popover
      :effect="'dark'"
      :width="popoverWidth"
      placement="bottom"
      trigger="click"
    >
      <template #reference>
        <el-icon
          v-show="isFold"
          :size="20"
          style="margin-right: 2rem; cursor: pointer"
        >
          <User v-show="!changeIcon" />
          <Operation v-show="changeIcon" />
        </el-icon>
      </template>
      <RightAside v-show="!changeIcon"></RightAside>
      <PostControllerPhone v-show="changeIcon"></PostControllerPhone>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Operation, User } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import RightAside from "@/views/layout/RightAside.vue";
import PostControllerPhone from "@/components/BlogPost/PostControllerPhone.vue";

const router = useRouter();
const route = useRoute();

// 导航栏
const header = ref<HTMLDivElement | null>();
const navList = reactive([
  {
    label: "项目",
    path: "/projects",
    isSelect: false,
  },
  {
    label: "文章",
    path: "/articles",
    isSelect: false,
  },
  {
    label: "发表",
    path: "/post",
    isSelect: false,
  },
]);

// 根据路径更新高亮的导航项
const updateSelect = () => {
  const curRoute = route.path.match(/^\/([a-zA-Z0-9\-_]+)(\/)?/)![1];
  navList.forEach((item) => {
    item.isSelect = item.path === "/" + curRoute;
  });
};

onMounted(() => {
  // header 随滚动隐藏
  window.addEventListener("scroll", handleScroll);
  // 初始化选中
  updateSelect();
});

// 点击导航栏时页面变化
const changePage = (path: string) => {
  router.push(path).then(() => {
    updateSelect();
  });
};

// 处理滚动
const headerState = reactive({
  startScrollTop: 0,
  headerClass: "",
});
const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop <= 50) {
    header.value!.style.transform = "translateY(0)";
    headerState.startScrollTop = scrollTop;
    return;
  }
  if (headerState.startScrollTop > scrollTop) {
    header.value!.style.transform = "translateY(0)";
  } else if (headerState.startScrollTop <= scrollTop) {
    header.value!.style.transform = "translateY(-3rem)";
  }
  headerState.startScrollTop = scrollTop;
};

// 处理响应式
const store = useStore();
let isFold = computed(() => store.state.windowSize < 1024);

let changeIcon = computed(() => {
  const rootPath = "/" + route.path.split("/")[1];
  return rootPath == "/post";
});

let popoverWidth = computed(() => {
  const rootPath = "/" + route.path.split("/")[1];
  if (rootPath == "/post") {
    return 150;
  } else {
    return 300;
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.header {
  position: fixed;
  // 元素开启 fixed 后可能会造成不透明度问题
  z-index: 1;
  width: 95vw;
  display: flex;
  align-items: center;
  height: 3rem;
  background-color: $background_color_box_dark;
  box-shadow: $box_shadow_regular_dark;
  border-radius: 1rem;
  transition: $transition_slow;
  transform: translateY(0);
}

.nav_item {
  font-size: $font-size-body;
  font-weight: $font-weight-big;
  margin: 0 1rem;
  cursor: pointer;
  // 将 color 设置透明以显示背景图片
  color: transparent;
  background-image: $background_image_regular;
  background-clip: text;
  transition: $transition_slow;
  // 现代化技术 css filter (IE: ?)
  // 以此制作背景图片的透明度过渡
  // 利用极端亮度制作白色效果
  filter: brightness(2);
}

.nav_item_selected {
  filter: none;
}
</style>
