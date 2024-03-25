<template>
  <div class="welcome">
    <div class="title">gushen Blog</div>
    <ul class="nav">
      <li v-for="item in navList" :key="item.path" @click="goMenu(item.path)">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router"

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
    label: "心情",
    path: "/mood"
  },
  {
    label: "与我",
    path: "/me"
  }
]

const goMenu: (path: string) => void = (path) => {
  router.push(path)
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.welcome {
  padding-top: 40vh;
}
.title {
  font-size: $font-size-title-large;
  margin-bottom: 1rem;
}
.nav {
  height: 3rem;
  border: solid 2px $font-color-dark;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: $font-size-body;
  font-weight: $font-weight-big;
  li {
    cursor: pointer;
    transition: $transition-regular;
  }
  li:hover {
    color: transparent;
    background-image: $font-color-selected-dark;
    background-clip: text;
  }
}
</style>
