<template>
  <div class="article-card">

    <div class="info">

      <div class="title" @click="openProjects(projectInfo.link)">
        {{ projectInfo.title }}
      </div>

      <div class="content">
        {{ projectInfo.content }}
      </div>

    </div>

    <transition name="del">
      <el-icon
          class="delete"
          :size="20"
          @click="deleteProject(projectInfo.id)"
          v-if="hoverState.hover && hoverState.hoverid === projectInfo.id">
        <Delete/>
      </el-icon>
    </transition>

  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import useRoute from "@/hooks/useRoute.ts"
import {ElMessage, ElMessageBox} from 'element-plus'
import useCheckLogin from "@/hooks/useCheckLogin.ts"
import {Delete} from "@element-plus/icons-vue";

const {projectInfo, hoverState} = defineProps({projectInfo: Object, hoverState: Object})

function openProjects(link) {
  useCheckLogin().then(res => {
    if (res) {
      window.open(link)
    } else {
      ElMessage({
        type: 'error',
        message: '请先登录'
      })
    }
  })
}

const emit = defineEmits(['triggerDeleteProject'])
const deleteProject = (id) => {

  useCheckLogin().then(res => {
    if (res) {
      ElMessageBox.confirm(
          `项目 ${projectInfo.title} 将被删除，是否继续? `,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        axios.delete(`${useRoute.BackEnd}/projects`, {params: {id}})
            .then(() => {
              ElMessage({
                type: 'success',
                message: '删除成功'
              })
              emit('triggerDeleteProject')
            }).catch(() => {
          ElMessage({
            type: 'error',
            message: '抱歉，出了点问题，请稍后再试'
          })
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
    } else {
      ElMessage({
        type: 'error',
        message: '请先登录'
      })
    }
  })

}

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/element.scss";

.info {
  width: 80%;
  cursor: pointer;
  overflow: hidden;
}

.title {
  background-image: $font-color-selected-dark;
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

.article-card {
  position: relative;
}

.delete {
  position: absolute;
  top: 0;
  right: 0;
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