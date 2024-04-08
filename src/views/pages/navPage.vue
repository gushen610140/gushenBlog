<template>
  <div class="page-body">
    <div class="title">gushen Blog</div>
    <ul class="navigator">
      <li
          v-for="item in navList"
          :key="item.path"
          @click="router.push(item.path)"
          class="item"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router"

const router = useRouter()

const navList = [
  {
    label: "项目",
    path: "/projects"
  },
  {
    label: "文章",
    path: "/articles"
  },
  {
    label: "发表",
    path: "/post"
  }
]

</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.page-body {
  margin: 40vh auto;
}

.title {
  font-size: $font-size-title-large;
  margin-bottom: 1rem;
}

.navigator {
  height: 3rem;
  box-shadow: $box-shadow-border-light;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: $font-size-body;
  font-weight: $font-weight-big;
}

.item {
  cursor: pointer;
  transition: $transition-slow;
  color: transparent;
  background-image: $gradient-colorful-transition;
  background-clip: text;
  background-size: 200%;
}

.item:hover {
  background-position: -2rem;
}

</style>
