import http from "@/utils/http.ts";

export const getArticleListAPI = () => {
  return http<ArticleDO[]>({
    url: "/article/list",
    method: "GET",
  });
};
