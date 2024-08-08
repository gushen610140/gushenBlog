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
