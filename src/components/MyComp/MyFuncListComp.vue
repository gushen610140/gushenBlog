<script lang="ts" setup>
import { changePageHook } from "@/hooks/useChangePageHook.js";
import { onMounted, ref } from "vue";
import { checkAdminAPI } from "@/api/UserAPI.ts";

const isAdmin = ref(false);

onMounted(() => {
  checkAdminAPI()
    .then((res) => {
      isAdmin.value = res.data;
    })
    .catch(() => {
      isAdmin.value = false;
    });
});
</script>

<template>
  <div class="function_container">
    <div
      :class="{ function_selected: $route.path === '/my' }"
      class="function_item"
      @click="changePageHook('/my')"
    >
      <span>个人资料</span>
    </div>
    <div
      :class="{ function_selected: $route.path === '/my/change_password' }"
      class="function_item"
      @click="changePageHook('/my/change_password')"
    >
      <span>更改密码</span>
    </div>
    <div
      :class="{ function_selected: $route.path === '/my/user_like_article' }"
      class="function_item"
      @click="changePageHook('/my/user_like_article')"
    >
      <span>收藏文章</span>
    </div>
    <div
      v-if="isAdmin"
      :class="{ function_selected: $route.path === '/my/article_manage' }"
      class="function_item"
      @click="changePageHook('/my/article_manage')"
    >
      <span>文章管理</span>
    </div>
    <div
      v-if="isAdmin"
      :class="{ function_selected: $route.path === '/my/project_manage' }"
      class="function_item"
      @click="changePageHook('/my/project_manage')"
    >
      <span>项目管理</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.function_container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem 0;
}

.function_item {
  height: 2.5rem;
  background-color: $background_color_box_dark;
  border-radius: 1rem;
  line-height: 2.5rem;
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: $transition_slow;
}

.function_selected {
  box-shadow: $box_shadow_vivid;
}
</style>
