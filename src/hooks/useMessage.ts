// 重新封装了 ElMessage 组件

import {ElMessage} from "element-plus";

export function success(message: string) {
    ElMessage({
        type: 'success',
        message: message
    })
}

export function error(message: string) {
    ElMessage({
        type: 'error',
        message: message
    })
}

export function warning(message: string) {
    ElMessage({
        type: 'warning',
        message: message
    })
}

export function info(message: string) {
    ElMessage({
        type: 'info',
        message: message
    })
}