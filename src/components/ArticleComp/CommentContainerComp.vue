<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  addCommentChildAPI,
  getCommentListFromArticleAPI,
  removeCommentAPI,
} from "@/api/CommentAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";
import { checkStringIsSpace } from "@/hooks/useCheckSpaceHook.ts";
import { useUserStore } from "@/store";
import { getUserInfoAPI } from "@/api/UserAPI.ts";

const props = defineProps<{
  article_id: string;
}>();

const commentList = ref<CommentDO[]>([
  {
    id: "string",
    user_id: "string",
    article_id: "string",
    content: "string",
    parent_comment_id: "string",
    publish_time: "string",
    user_avatar: "string",
    user_nickname: "string",
    to_comment_id: "string",
    to_comment_user_nickname: "string",
  },
]);

const commentContent = ref("");

const userStore = useUserStore();

onMounted(() => {
  getCommentListFromArticleEvent();
  getUserInfoAPI().then((res) => {
    userStore.setUser(res.data);
  });
});

const getCommentListFromArticleEvent = () => {
  getCommentListFromArticleAPI(props.article_id).then((res) => {
    commentList.value = res.data;
  });
};

const removeCommentEvent = (id: string) => {
  removeCommentAPI(id).then((res) => {
    if (res.data) {
      commentList.value = commentList.value.filter((item) => item.id !== id);
      noticeSuccess(res.message);
    } else {
      noticeError(res.message);
    }
  });
};

const addCommentChildEvent = (to_comment_id: string, parent_comment_id: string) => {
  if (checkStringIsSpace(commentContent.value)) {
    noticeError("评论内容不能为空");
    return;
  }
  addCommentChildAPI(props.article_id, to_comment_id, parent_comment_id, commentContent.value).then(
    (res) => {
      if (res.data) {
        getCommentListFromArticleEvent();
        commentContent.value = "";
        noticeSuccess(res.message);
      } else {
        noticeError(res.message);
      }
    },
  );
};

defineExpose<{
  getCommentListFromArticleEvent: () => void;
}>({
  getCommentListFromArticleEvent,
});
</script>

<template>
  <v-app class="bg-transparent" theme="dark">
    <div class="container">
      <template v-for="commentItem in commentList">
        <v-card v-if="commentItem.parent_comment_id == 'root'" class="mb-3 bg-transparent">
          <v-card-actions>
            <v-avatar :image="commentItem.user_avatar" class="ml-5 mr-3" size="30"></v-avatar>
            {{ commentItem.user_nickname }}
            <div class="flex-1"></div>
            <v-dialog v-if="userStore.user?.id == commentItem.user_id" max-width="400">
              <template #activator="{ props }">
                <v-icon icon="mdi-trash-can" v-bind="props"></v-icon>
              </template>
              <template #default="{ isActive }">
                <v-card>
                  <v-card-title>确认删除</v-card-title>
                  <v-card-text>您确定要删除这条评论吗</v-card-text>
                  <v-card-actions>
                    <v-btn text="取消" @click="isActive.value = false"></v-btn>
                    <v-btn
                      color="red"
                      text="确认"
                      variant="flat"
                      @click="
                        removeCommentEvent(commentItem.id);
                        isActive.value = false;
                      "
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-actions>

          <v-card-text class="ml-12">{{ commentItem.content }}</v-card-text>

          <v-card-actions>
            <span class="ml-5 text-gray-400">{{ commentItem.publish_time }}</span>
            <div class="flex-1"></div>
            <v-dialog max-width="800">
              <template v-slot:activator="{ props }">
                <v-btn text="回复" v-bind="props"></v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title>回复评论</v-card-title>
                  <v-card-text><v-text-field v-model="commentContent"></v-text-field></v-card-text>
                  <v-card-actions>
                    <v-btn text="取消" @click="isActive.value = false"></v-btn>
                    <v-btn
                      color="blue"
                      text="回复"
                      variant="flat"
                      @click="
                        addCommentChildEvent(commentItem.id, commentItem.id);
                        isActive.value = false;
                      "
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-actions>
        </v-card>

        <template v-for="childCommentItem in commentList">
          <v-card
            v-if="childCommentItem.parent_comment_id == commentItem.id"
            class="ml-10 mb-2 bg-transparent"
          >
            <v-card-actions>
              <v-avatar
                :image="childCommentItem.user_avatar"
                class="ml-5 mr-3"
                size="30"
              ></v-avatar>
              {{ childCommentItem.user_nickname }}
              <span>&nbsp;回复&nbsp;</span>
              {{ childCommentItem.to_comment_user_nickname }}
              <div class="flex-1"></div>
              <v-dialog max-width="400">
                <template #activator="{ props }">
                  <v-icon icon="mdi-trash-can" v-bind="props"></v-icon>
                </template>
                <template #default="{ isActive }">
                  <v-card>
                    <v-card-title>确认删除</v-card-title>
                    <v-card-text>您确定要删除这条评论吗</v-card-text>
                    <v-card-actions>
                      <v-btn text="取消" @click="isActive.value = false"></v-btn>
                      <v-btn
                        color="red"
                        text="确认"
                        variant="flat"
                        @click="
                          removeCommentEvent(childCommentItem.id);
                          isActive.value = false;
                        "
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-actions>

            <v-card-text class="ml-12">{{ childCommentItem.content }}</v-card-text>

            <v-card-actions>
              <span class="ml-5 text-gray-400">{{ commentItem.publish_time }}</span>
              <div class="flex-1"></div>
              <v-dialog max-width="800">
                <template v-slot:activator="{ props }">
                  <v-btn text="回复" v-bind="props"></v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-card-title>回复评论</v-card-title>
                    <v-card-text
                      ><v-text-field v-model="commentContent"></v-text-field
                    ></v-card-text>
                    <v-card-actions>
                      <v-btn text="取消" @click="isActive.value = false"></v-btn>
                      <v-btn
                        color="blue"
                        text="回复"
                        variant="flat"
                        @click="
                          addCommentChildEvent(childCommentItem.id, commentItem.id);
                          isActive.value = false;
                        "
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </template>
      </template>
    </div>
  </v-app>
</template>

<style lang="scss" scoped></style>
