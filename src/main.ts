import { createApp } from "vue";
import App from "@/App.vue";
// 引用 vue-router
import router from "@/router";
// 引用 ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入 el-icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 引入 vuex
import store from "@/store";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
// VuetifyProTipTap
import { vuetifyProTipTap } from "@/tiptap";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

// 以根目录下的 app 组件为根组件
const app = createApp(App);

// 安装插件
app.use(router);
app.use(ElementPlus);
app.use(store);
app.use(vuetify);
app.use(vuetifyProTipTap);

// 注册 el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂载 DOM
app.mount("#app");
