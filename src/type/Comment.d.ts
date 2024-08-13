declare interface CommentDO {
  id: string;
  user_id: string;
  article_id: string;
  content: string;
  parent_comment_id: string;
  publish_time: string;
  user_avatar: string;
  user_nickname: string;
  to_comment_id: string;
  to_comment_user_nickname: string;
}
