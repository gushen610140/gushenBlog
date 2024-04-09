<template>
  <div class="header-box" :class="headerState.headerClass">
    <ul class="navigator">
      <li
          v-for="item in navList"
          :key="item.path"
          @click="handleClick(item.path)"
          class="item"
          :class="{selected: item.isSelect}"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from 'vue'
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()

const navList = reactive([
  {
    label: "项目",
    path: "/projects",
    isSelect: false
  },
  {
    label: "文章",
    path: "/articles",
    isSelect: false
  },
  {
    label: "发表",
    path: "/post",
    isSelect: false
  }
])

const changeSelect = (path: string) => {
  navList.forEach(item => {
    const rootPath = '/' + path.split('/')[1]
    item.isSelect = item.path == rootPath
  })
}

const handleClick = (path: string) => {
  router.push(path)
  changeSelect(path)
}

// 处理滚动事件
const headerState = reactive({
  startScrollTop: 0,
  headerClass: "",
})
const handleScroll = () => {
  // 获取当前滚动位置
  let scrollTop = document.documentElement.scrollTop
  // 获取开始滚动的位置
  if (scrollTop <= 50) {
    // 50 以内保持固定
    headerState.headerClass = "fixed-header";
    headerState.startScrollTop = scrollTop;
    return;
  }
  // 向上滚动
  if (headerState.startScrollTop > scrollTop) {
    headerState.headerClass = "fixed-header";
    // 向下滚动
  } else if (headerState.startScrollTop <= scrollTop) {
    headerState.headerClass = "hide-header";
  }
  // 重置开始滚动位置
  headerState.startScrollTop = scrollTop;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
  changeSelect(route.path)
})

</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.navigator {
  height: 50px;
  background-color: $box-background-color-dark;
  box-shadow: $box-shadow-border;
  border-radius: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.item {
  font-size: $font-size-body;
  font-weight: $font-weight-big;
  margin-left: 2rem;
  cursor: pointer;
  color: transparent;
  background-image: $gradient-colorful-transition;
  background-size: 200%;
  background-clip: text;
  transition: $transition-slow;
}

.item:hover {
  background-position: -2rem;
}

.selected {
  background-position: -2rem;
}

// #region 处理 header 的滚动动画与对应类
.hide-header {
  animation-name: hideHeader;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

.fixed-header {
  animation-name: showHeader;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

@keyframes showHeader {
  0% {
    transform: translateY(-52px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes hideHeader {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-52px);
  }
}

// #endregion

</style>