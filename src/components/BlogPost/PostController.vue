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

<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router';
import {onMounted, reactive} from "vue";

const router = useRouter(), route = useRoute()

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
    console.log(item.path == path)
    item.isSelect = item.path == path
  })
}

onMounted(() => {
  changeSelect(route.path)
})

</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.container {
  background-color: $box-background-color-dark;
  height: 40rem;
  padding-top: 1rem;
  transition: $transition-regular;
  box-shadow: $box-shadow-border-dark;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container:hover {
  box-shadow: $box-shadow-border-light;
}

.item {
  cursor: pointer;
  margin-top: 2rem;
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