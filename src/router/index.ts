import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/NavPage.vue"),
  },
  {
    path: "/projects",
    component: () => import("@/pages/ProjectPage.vue"),
  },
  {
    path: "/articles",
    component: () => import("@/pages/ArticlePage.vue"),
  },
  {
    path: "/my",
    component: () => import("@/pages/MyPage.vue"),
  },
  {
    path: "/login",
    component: () => import("@/pages/LoginPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
