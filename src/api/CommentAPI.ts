import http from "@/utils/http.ts";

export const getCommentListFromArticleAPI = (article_id: string) => {
  return http<CommentDO[]>({
    url: "/comment/list_from_article",
    method: "GET",
    params: { article_id },
  });
};

export const getCommentCountFromArticleAPI = (article_id: string) => {
  return http<number>({
    url: "/comment/count_from_article",
    method: "GET",
    params: { article_id },
  });
};

export const addCommentRootAPI = (article_id: string, content: string) => {
  return http<boolean>({
    url: "/comment/add_root",
    method: "POST",
    data: { article_id, content },
  });
};

export const addCommentChildAPI = (
  article_id: string,
  to_comment_id: string,
  parent_comment_id: string,
  content: string,
) => {
  return http<boolean>({
    url: "/comment/add_child",
    method: "POST",
    data: { article_id, to_comment_id, parent_comment_id, content },
  });
};

export const removeCommentAPI = (id: string) => {
  return http<boolean>({
    url: "/comment/remove",
    method: "DELETE",
    params: { id },
  });
};
