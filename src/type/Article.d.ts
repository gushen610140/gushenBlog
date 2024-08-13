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
