declare interface UserLoginVO {
  email: string;
  password: string;
}

declare interface Result<T> {
  code: number;
  message: string;
  data: T;
}

declare interface ArticleDO {
  id: string;
  title: string;
  content: string;
  publish_time: string;
  comment_count: number;
  like_count: number;
  author_id: string;
  author_nickname: string;
}

declare interface ArticlePostVO {
  title: string;
  content: string;
}

declare interface ArticleUpdateVO {
  id: string;
  title: string;
  content: string;
}

declare interface ProjectDO {
  id: string;
  title: string;
  content: string;
  link: string;
  publish_time: string;
}

declare interface ProjectPostVO {
  title: string;
  content: string;
  link: string;
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
