<template>
  <div class="container">
    <div class="title">发表文章</div>

    <el-form :model="form" class="form">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="form.content" :rows="24" type="textarea" />
      </el-form-item>

      <el-form-item class="button-container">
        <el-button class="button" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ElMessageBox } from "element-plus";
import useCheckLogin from "@/hooks/useCheckLogin.ts";
import {
  notice,
  noticeError,
  noticeSuccess,
} from "@/hooks/useNoticeMessageHook.ts";
import postArticle from "@/hooks/AsyncRequest/Article/postArticle.ts";

const form = reactive({
  title: "",
  content: "",
});

const onSubmit = () => {
  useCheckLogin().then((res) => {
    if (res) {
      ElMessageBox.confirm(`是否确认要添加项目? `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          postArticle(form)
            .then((res) => {
              noticeSuccess(res);
            })
            .catch((err) => {
              noticeError(err.message);
            });
        })
        .catch(() => {
          notice("已取消添加文章");
        });
    } else {
      noticeError("请先进行登录");
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/element";

.article_container {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}

.title {
  margin-bottom: 1rem;
  font-size: $font_size_little_big;
}

.form {
  width: 80%;
}

.button-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.button {
  position: absolute;
  right: 0;
}
</style>
