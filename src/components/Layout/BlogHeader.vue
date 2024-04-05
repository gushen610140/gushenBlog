<template>
  <div class="header-box" :class="headerState.headerClass">
    <el-row>
      <el-col :span="24">
        <el-menu
            mode="horizontal"
            class="nav-menu"
            :default-active="activeMenu"
            @select="handleSelect"
        >
          <div class="flex-grow"></div>
          <el-menu-item index="/projects">
            项目
          </el-menu-item>
          <el-menu-item index="/articles">
            文章
          </el-menu-item>
          <el-menu-item index="/mood">
            心情
          </el-menu-item>
          <el-menu-item index="/me">
            与我
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

// 菜单默认选择
const activeMenu = computed(() => {
  let curRoute = route.path
  if (curRoute === '/me/projects' || curRoute === '/me/articles') {
    curRoute = '/me'
  }
  return curRoute
})

const headerState = reactive({
  startScrollTop: 0,
  headerClass: "",
})

const handleSelect = (index: any) => {
  router.push(index)
}

// 处理滚动事件
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

// 我屈服了，不用 v-on 绑定 scroll 了
onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.nav-menu {
  height: 50px;
  background-color: $box-background-color-dark;
  border-radius: 20px;
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