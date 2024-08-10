<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { addProjectAPI, getProjectCountAPI, getProjectListByPageAPI } from "@/api/ProjectAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";

const projectList = ref<ProjectDO[]>([]);
const pageConfig = ref({
  curPage: 1,
  pageSize: 10,
  totalPage: 0,
});

const projectPostVO = ref<ProjectPostVO>({
  title: "",
  content: "",
  link: "",
});

onMounted(() => {
  updatePageEvent();
});

const updatePageEvent = () => {
  getProjectListByPageAPI(pageConfig.value.curPage, pageConfig.value.pageSize).then((res) => {
    projectList.value = res.data;
  });
  getProjectCountAPI().then((res) => {
    pageConfig.value.totalPage = Math.ceil(res.data / pageConfig.value.pageSize);
    if (pageConfig.value.curPage > pageConfig.value.totalPage) {
      pageConfig.value.curPage = pageConfig.value.totalPage;
      updatePageEvent();
    }
  });
};

const updateCurPageEvent = (curPage: number) => {
  pageConfig.value.curPage = curPage;
  updatePageEvent();
};

const publishProjectEvent = (isActive: Ref<boolean>) => {
  addProjectAPI(projectPostVO.value).then((res) => {
    if (res.data) {
      noticeSuccess(res.message);
      updatePageEvent();
      projectPostVO.value = {
        title: "",
        content: "",
        link: "",
      };
      isActive.value = false;
    } else {
      noticeError(res.message);
    }
  });
};
</script>

<template>
  <div class="project_manage_container">
    <div class="title">项目管理</div>
    <v-dialog max-width="600" persistent theme="dark">
      <template v-slot:activator="{ props }">
        <div class="btn publish" v-bind="props">发布新项目</div>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="发布新项目">
          <v-card-text>
            <v-text-field v-model="projectPostVO.title" label="项目标题"></v-text-field>
            <v-text-field v-model="projectPostVO.content" label="项目内容"></v-text-field>
            <v-text-field v-model="projectPostVO.link" label="项目链接"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn text="取消" @click="isActive.value = false"></v-btn>
            <v-btn
              color="blue"
              text="发布"
              variant="flat"
              @click="publishProjectEvent(isActive)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <el-divider style="border-color: #e3e3e3"></el-divider>
    <v-pagination
      :length="pageConfig.totalPage"
      :model-value="pageConfig.curPage"
      density="compact"
      rounded="circle"
      style="margin-bottom: 1rem"
      @update:modelValue="updateCurPageEvent"
    ></v-pagination>
    <table style="padding: 1rem; margin: 0 1rem; width: 100%">
      <tr style="text-align: center; height: 2rem; color: #b1b3b8">
        <td style="width: 20%">项目标题</td>
        <td style="width: 30%">发布时间</td>
        <td style="width: 30%">链接</td>
        <td style="width: 20%">操作</td>
      </tr>
      <tr
        v-for="articleItem in projectList"
        :key="articleItem.id"
        style="height: 3rem; box-shadow: 0 5px 1px -5px #fff; text-align: center"
      >
        <td>{{ articleItem.title }}</td>
        <td>{{ articleItem.publish_time }}</td>
        <td>{{ articleItem.link }}</td>
        <td style="display: flex; align-items: center; justify-content: center; height: 3rem">
          <div class="btn edit_btn">编辑</div>
          <div class="btn del_btn">删除</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";

.project_manage_container {
  border-radius: 1rem;
  padding: 1rem;
  background-color: $background_color_box_dark;
  position: relative;
}

.title {
  font-size: $font_size_big;
  margin-left: 2rem;
  margin-top: 1rem;
}

.btn {
  text-align: center;
  width: 3rem;
  height: 1.5rem;
  line-height: 1.5rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: $transition_slow;
}

.publish {
  position: absolute;
  right: 3rem;
  top: 4rem;
  background-color: #cbcbcb;
  color: #2f2f2f;
  width: 6rem;
}

.publish:hover {
  box-shadow: 0 0 0.5rem #cbcbcb;
}

.edit_btn {
  background-color: #238636;
}

.edit_btn:hover {
  box-shadow: 0 0 0.5rem #238636;
}

.del_btn {
  margin-left: 0.5rem;
  background-color: #f85149;
}

.del_btn:hover {
  box-shadow: 0 0 0.5rem #f85149;
}
</style>
