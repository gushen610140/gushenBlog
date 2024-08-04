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
    children: [
      {
        path: "",
        component: () => import("@/components/MyComp/MyInfoComp.vue"),
      },
      {
        path: "user_like_article",
        component: () => import("@/components/MyComp/MyLikeArticleComp.vue"),
      },
      {
        path: "article_manage",
        component: () => import("@/components/MyComp/MyArticleManageComp.vue"),
      },
      {
        path: "project_manage",
        component: () => import("@/components/MyComp/MyProjectManageComp.vue"),
      },
    ],
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
