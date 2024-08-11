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

export const updateUserInfoAPI = (userUpdateInfoVO: UserUpdateInfoVO) => {
  return http<string>({
    url: "/user/update",
    method: "PUT",
    data: userUpdateInfoVO,
  });
};

export const userRegisterAPI = (userRegisterVO: UserRegisterVO) => {
  return http<string>({
    url: "/user/register",
    method: "POST",
    data: userRegisterVO,
  });
};

export const userChangePasswordAPI = (userChangePasswordVO: UserChangePasswordVO) => {
  return http<boolean>({
    url: "/user/change_password",
    method: "POST",
    data: userChangePasswordVO,
  });
};

export const userResetPasswordAPI = (userForgetPasswordVO: UserForgetPasswordVO) => {
  return http<string>({
    url: "/user/reset_password",
    method: "PUT",
    data: userForgetPasswordVO,
  });
};

export const checkAdminAPI = () => {
  return http<boolean>({
    url: "/user/check_admin",
    method: "GET",
  });
};

export const uploadAvatarAPI = (formData: FormData) => {
  return http<string>({
    url: "/file/upload",
    method: "POST",
    data: formData,
  });
};

export const updateAvatarAPI = (avatar: string) => {
  return http<boolean>({
    url: "/user/update_avatar",
    method: "PUT",
    params: {
      avatar,
    },
  });
};
