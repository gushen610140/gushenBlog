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
    url: "/like/count_from_article",
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

export const getLikeListByUserAPI = () => {
  return http<LikeDO[]>({
    url: "/like/list_by_user",
    method: "GET",
  });
};

export const getLikeCountFromUserAPI = () => {
  return http<number>({
    url: "/like/count_from_user",
    method: "GET",
  });
};

export const getLikeListByUserByPageAPI = (curPage: number, pageSize: number) => {
  return http<LikeDO[]>({
    url: "/like/list_by_user_by_page",
    method: "GET",
    params: { curPage, pageSize },
  });
};
