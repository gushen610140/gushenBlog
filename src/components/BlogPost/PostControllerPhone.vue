<script setup lang="ts">

import {onMounted, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const postList = reactive([
  {
    name: '发表项目',
    path: '/post/projects',
    isSelect: false
  },
  {
    name: '发表文章',
    path: '/post/articles',
    isSelect: false
  }
])

const changeSelect = (path: string) => {
  postList.forEach(item => {
    item.isSelect = item.path == path
  })
}

onMounted(() => {
  changeSelect(route.path)
})

</script>

<template>
  <ul class="container">
    <li
        v-for="item in postList"
        :key="item.path"
        @click="router.push(item.path); changeSelect(item.path)"
        class="item"
        :class="{selected: item.isSelect}"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.container {
  height: 15rem;
  padding-top: 1rem;
  transition: $transition-regular;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.item {
  cursor: pointer;
  margin-top: 2rem;
  font-size: $font-size-title-small;
  font-weight: $font-weight-big;
  color: transparent;
  background-image: $gradient-colorful-transition;
  background-size: 200%;
  background-clip: text;
  transition: $transition-slow;
}

.item:hover {
  background-position: -4rem;
}

.selected {
  background-position: -4rem;
}
</style>