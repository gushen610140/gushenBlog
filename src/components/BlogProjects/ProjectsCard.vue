<template>
  <el-card
      class="card"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
  >
    <div class="info">
      <div class="title" @click="openProjects()">
        {{ props.projectInfo.title }}
      </div>
      <div class="content">
        {{ props.projectInfo.content }}
      </div>
    </div>

    <transition name="del">
      <el-icon
          class="delete"
          :size="20"
          @click="removeProject"
          v-if="isHover">
        <Delete/>
      </el-icon>
    </transition>

  </el-card>
</template>

<script setup lang="ts">
import {ElMessageBox} from 'element-plus'
import useCheckLogin from "@/hooks/useCheckLogin.ts"
import {error, success, info} from "@/hooks/useMessage.ts"
import ProjectInfo from "@/type/ProjectInfo.ts";
import {ref} from "vue";
import {Delete} from "@element-plus/icons-vue";
import deleteProject from "@/hooks/AsyncRequest/Projects/deleteProject.ts";
import ResponseInfo from "@/type/ResponseInfo.ts";

const props = defineProps<{ projectInfo: ProjectInfo }>()
const isHover = ref(false)

function openProjects() {
  useCheckLogin().then(res => {
    if (res) {
      window.open(props.projectInfo.link);
    } else {
      error('请先进行登录');
    }
  }).catch(err => {
    error(err.message);
  })
}

const emit = defineEmits(['projectDeleted'])
const removeProject = () => {
  useCheckLogin().then(res => {
    if (res) {
      ElMessageBox.confirm(
          `项目 ${props.projectInfo.title} 将被删除，是否继续? `,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            deleteProject(props.projectInfo.id).then((res: ResponseInfo) => {
              if (res.status == 200) {
                success(res.message)
                emit('projectDeleted')
              } else if (res.status == 401 || res.status == 402) {
                error(res.message)
              }
            }).catch(err => {
              error(err.message)
            })
          })
          .catch(() => {
            info('已取消删除')
          })
    } else {
      error('请先进行登录')
    }
  })
}

</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.info {
  width: 80%;
  cursor: pointer;
  overflow: hidden;
}

.title {
  background-image: $gradient-colorful;
  background-clip: text;
  color: $font-color-dark;
  font-size: $font-size-title;
  font-weight: $font-weight-big;
}

.content {
  color: $font-color-dark;
  font-size: $font-size-body;
  margin-left: 1rem;
}

.card {
  border: none;
  background-color: $box-background-color-dark;
  margin: 3rem 0;
  position: relative;
  transition: $transition-slow;
}

.card:hover {
  box-shadow: $box-shadow-border-light;
}

.delete {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: $font-color-dark;
  cursor: pointer;
  transition: $transition-regular;
}

.del-enter-active,
.del-leave-active {
  transition: all 0.5s; /* 使用 all 进行整体过渡效果 */
  transition-property: opacity, transform; /* 指定过渡属性 */
}

.del-enter-from,
.del-leave-to {
  opacity: 0;
  transform: translateX(100%); /* 设置初始状态为向右侧偏移 */
}

.del-enter-to,
.del-leave-from {
  opacity: 1;
  transform: translateX(0); /* 设置最终状态为正常位置 */
}

</style>