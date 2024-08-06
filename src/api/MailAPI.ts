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
