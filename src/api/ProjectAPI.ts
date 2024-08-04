import http from "@/utils/http.ts";

export const getProjectListAPI = () => {
  return http<ProjectDO[]>({
    url: "/project/list",
    method: "GET",
  });
};
