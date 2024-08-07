import http from "@/utils/http.ts";

export const sendCodeAPI = (email: string) => {
  return http<boolean>({
    url: "/user/send_code",
    method: "GET",
    params: {
      email,
    },
  });
};

export const sendCodeByTokenAPI = () => {
  return http<boolean>({
    url: "/user/send_code_by_token",
    method: "GET",
  });
};
