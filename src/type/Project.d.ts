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

declare interface ProjectUpdateVO {
  id: string;
  title: string;
  content: string;
  link: string;
}
