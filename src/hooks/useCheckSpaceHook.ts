export const checkHtmlContentIsSpace = (content: string) => {
  // TODO 无法解决html标签嵌套的问题
  content.replace(/<[^>]*>/g, "");
  return content.trim() == "";
};

export const checkStringIsSpace = (content: string) => {
  return content.trim() == "";
};
