import http from "@/utils/http.ts";

export const userLoginAPI = (userLoginVO: UserLoginVO) => {
  return http<string>({
    url: "/user/login",
    method: "POST",
    data: userLoginVO,
  });
};

export const getUserInfoAPI = () => {
  return http<UserVO>({
    url: "/user/info",
    method: "GET",
  });
};
