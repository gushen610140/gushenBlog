<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  addCommentChildAPI,
  getCommentListFromArticleAPI,
  removeCommentAPI,
} from "@/api/CommentAPI.ts";
import { noticeError, noticeSuccess } from "@/hooks/useNoticeMessageHook.ts";

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
    to_commnet_user_id: "string",
  },
]);

const commentContent = ref("");

onMounted(() => {
  getCommentListFromArticleEvent();
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
  <v-app theme="dark">
    <div class="container">
      <template v-for="commentItem in commentList">
        <v-card v-if="commentItem.parent_comment_id == 'root'">
          <v-card-actions>
            <v-avatar :image="commentItem.user_avatar"></v-avatar>
            {{ commentItem.user_nickname }}
            <v-icon icon="mdi-trash-can" @click="removeCommentEvent(commentItem.id)"></v-icon>
          </v-card-actions>
          <v-card-text>{{ commentItem.content }}</v-card-text>
          <v-card-actions>
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
          <v-card v-if="childCommentItem.parent_comment_id == commentItem.id" class="ml-10">
            <v-card-actions>
              <v-avatar :image="childCommentItem.user_avatar"></v-avatar>
              {{ childCommentItem.user_nickname }} 回复 {{ commentItem.user_nickname }}
              <v-icon
                icon="mdi-trash-can"
                @click="removeCommentEvent(childCommentItem.id)"
              ></v-icon>
            </v-card-actions>
            <v-card-text>{{ childCommentItem.content }}</v-card-text>
            <v-card-actions>
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
