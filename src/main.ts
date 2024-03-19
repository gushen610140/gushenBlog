import { createApp } from "vue"
import App from "@/App.vue"
// 引用 vue-router
import router from "@/router"
// 引用 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 以根目录下的 app 组件为根组件
const app = createApp(App)

// 安装插件
app.use(router)
app.use(ElementPlus)

// 挂载 DOM
app.mount('#app')
