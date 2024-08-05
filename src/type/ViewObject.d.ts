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
}

declare interface ProjectDO {
  id: string;
  title: string;
  content: string;
  link: string;
  publish_time: string;
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
