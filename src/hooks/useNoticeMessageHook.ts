// 重新封装了 ElMessage 组件

import { ElMessage } from "element-plus";

// TODO el-message 背景改成黑色

export function noticeSuccess(message: string) {
  ElMessage({
    showClose: true,
    type: "success",
    message: message,
  });
}

export function noticeError(message: string) {
  ElMessage({
    showClose: true,
    type: "error",
    message: message,
  });
}

export function noticeWarning(message: string) {
  ElMessage({
    showClose: true,
    type: "warning",
    message: message,
  });
}

export function notice(message: string) {
  ElMessage({
    showClose: true,
    type: "info",
    message: message,
  });
}
