// 简单封装toast组件

import { useToast } from "vue-toastification";

const toast = useToast();

export function noticeSuccess(message: string) {
  toast.success(message, { timeout: 4000 });
}

export function noticeError(message: string) {
  toast.error(message, { timeout: 4000 });
}

export function notice(message: string) {
  toast.info(message, { timeout: 4000 });
}
