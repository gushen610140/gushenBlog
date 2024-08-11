import http from "@/utils/http.ts";

export const addLikeAPI = (article_id: string) => {
  return http<boolean>({
    url: "/like/add",
    method: "POST",
    params: { article_id },
  });
};

export const removeLikeAPI = (id: string) => {
  return http<boolean>({
    url: "/like/remove",
    method: "DELETE",
    params: { id },
  });
};

export const getLikeListAPI = () => {
  return http<LikeDO[]>({
    url: "/like/list",
    method: "GET",
  });
};

export const getLikeCountFromArticleAPI = (article_id: string) => {
  return http<number>({
    url: "/like/count",
    method: "GET",
    params: { article_id },
  });
};

export const checkIsLikedAPI = (article_id: string) => {
  return http<boolean>({
    url: "/like/check",
    method: "GET",
    params: { article_id },
  });
};

export const removeLikeFromArticleAPI = (article_id: string) => {
  return http<boolean>({
    url: "/like/remove_from_article",
    method: "DELETE",
    params: { article_id },
  });
};
