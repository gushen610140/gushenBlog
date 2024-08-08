<template>
  <div
    class="card_body"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="info" @click="openProject">
      <div class="title">
        {{ props.projectInfo.title }}
      </div>
      <div class="content">
        {{ props.projectInfo.content }}
      </div>
    </div>

    <transition name="del">
      <el-icon v-if="isHover" :size="20" class="delete" @click="removeProject">
        <Delete />
      </el-icon>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import useCheckLogin from "@/hooks/useCheckLogin.ts";
import { notice, noticeError } from "@/hooks/useNoticeMessageHook.ts";
import { ref } from "vue";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps<{ projectInfo: ProjectDO }>();
const isHover = ref(false);

const openProject = () => {
  window.open(props.projectInfo.link);
};

const emit = defineEmits(["projectDeleted"]);
const removeProject = () => {
  useCheckLogin().then((res) => {
    if (res) {
      ElMessageBox.confirm(
        `项目 ${props.projectInfo.title} 将被删除，是否继续? `,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {})
        .catch(() => {
          notice("已取消删除");
        });
    } else {
      noticeError("请先进行登录");
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.card_body {
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: $background_color_box_dark;
  position: relative;
  transition: $transition_slow;
}

.card_body:hover {
  box-shadow: $box_shadow_regular_light;
}

.info {
  width: 70%;
  cursor: pointer;
  overflow: hidden;
}

.title {
  background-image: $background_image_regular;
  background-clip: text;
  color: transparent;
  font-size: $font_size_big;
  font-weight: $font_weight_big;
}

.content {
  color: $font_color_white;
  font-size: $font_size_regular;
  margin-left: 1rem;
}

.delete {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: $font_color_white;
  cursor: pointer;
  transition: $transition_regular;
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
