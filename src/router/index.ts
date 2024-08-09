import { createRouter, createWebHashHistory } from "vue-router";
import { routerCheckAdminHook } from "@/hooks/routerCheckAdminHook.ts";

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
        beforeEnter: routerCheckAdminHook,
      },
      {
        path: "project_manage",
        component: () => import("@/components/MyComp/MyProjectManageComp.vue"),
        beforeEnter: routerCheckAdminHook,
      },
      {
        path: "change_password",
        component: () => import("@/components/MyComp/MyChangePasswordComp.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("@/pages/RegisterPage.vue"),
  },
  {
    path: "/forget_password",
    component: () => import("@/pages/ForgetPasswordPage.vue"),
  },
  {
    path: "/article/:id",
    component: () => import("@/pages/ViewArticlePage.vue"),
  },
  {
    path: "/publish_article",
    component: () => import("@/pages/PublishNewArticlePage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
