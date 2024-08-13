declare interface UserLoginVO {
  email: string;
  password: string;
}

declare interface UserVO {
  id: string;
  nickname: string;
  email: string;
  avatar: string;
}

declare interface UserUpdateInfoVO {
  nickname: string;
  email: string;
}

declare interface UserRegisterVO {
  email: string;
  nickname: string;
  password: string;
  again_password: string;
  verify_code: string;
}

declare interface UserChangePasswordVO {
  old_password: string;
  new_password: string;
  again_password: string;
  verify_code: string;
}

declare interface UserForgetPasswordVO {
  email: string;
  new_password: string;
  again_password: string;
  verify_code: string;
}
