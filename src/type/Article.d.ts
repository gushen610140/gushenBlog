declare interface ArticleDO {
  id: string;
  title: string;
  content: string;
  publish_time: string;
  introduction: string;
  author_id: string;
  author_nickname: string;
}

declare interface ArticlePostVO {
  title: string;
  content: string;
  introduction: string;
}

declare interface ArticleUpdateVO {
  id: string;
  title: string;
  content: string;
  introduction: string;
}
