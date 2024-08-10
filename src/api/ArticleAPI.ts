import http from "@/utils/http.ts";

export const getArticleListAPI = () => {
  return http<ArticleDO[]>({
    url: "/article/list",
    method: "GET",
  });
};

export const getArticleListByPageAPI = (curPage: number, pageSize: number) => {
  return http<ArticleDO[]>({
    url: "/article/list_page",
    method: "GET",
    params: {
      curPage,
      pageSize,
    },
  });
};

export const getArticleCountAPI = () => {
  return http<number>({
    url: "/article/count",
    method: "GET",
  });
};

export const getArticleByIdAPI = (id: string) => {
  return http<ArticleDO>({
    url: "/article/view",
    method: "GET",
    params: {
      id,
    },
  });
};

export const addArticleAPI = (articlePostVO: ArticlePostVO) => {
  return http<boolean>({
    url: "/article/add",
    method: "POST",
    data: articlePostVO,
  });
};

export const updateArticleAPI = (articleUpdateVO: ArticleUpdateVO) => {
  return http<boolean>({
    url: "/article/update",
    method: "PUT",
    data: articleUpdateVO,
  });
};

export const deleteArticleAPI = (id: string) => {
  return http<boolean>({
    url: "/article/delete",
    method: "DELETE",
    params: {
      id,
    },
  });
};
