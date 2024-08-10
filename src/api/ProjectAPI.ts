import http from "@/utils/http.ts";

export const getProjectListAPI = () => {
  return http<ProjectDO[]>({
    url: "/project/list",
    method: "GET",
  });
};

export const getProjectListByPageAPI = (curPage: number, pageSize: number) => {
  return http<ProjectDO[]>({
    url: "/project/list_page",
    method: "GET",
    params: {
      curPage,
      pageSize,
    },
  });
};

export const getProjectCountAPI = () => {
  return http<number>({
    url: "/project/count",
    method: "GET",
  });
};

export const addProjectAPI = (projectPostVO: ProjectPostVO) => {
  return http<boolean>({
    url: "/project/add",
    method: "POST",
    data: projectPostVO,
  });
};

export const deleteProjectAPI = (id: string) => {
  return http<boolean>({
    url: "/project/delete",
    method: "DELETE",
    params: {
      id,
    },
  });
};
