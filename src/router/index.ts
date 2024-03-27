import { createRouter, createWebHashHistory } from "vue-router"

import navPage from "@/views/navPage.vue"
import layout from "@/views/layout.vue"

const routes = [
  {
    path: "/",
    name: "Nav",
    component: navPage
  },
  {
    path: "/",
    name: "Layout",
    component: layout,
    children: [
      {
        path: "projects",
        name: "projects",
        component: () => import("@/components/Pages/BlogProjects.vue")
      },
      {
        path: "articles",
        name: "articles",
        component: () => import("@/components/Pages/BlogArticles.vue")
      },
      {
        path: "mood",
        name: "mood",
        component: () => import("@/components/Pages/BlogMood.vue")
      },
      {
        path: "me",
        name: "me",
        component: () => import("@/components/Pages/BlogMe.vue"),
        redirect: "/me/projects",
        children: [
          {
            path: "projects",
            component: () => import("@/components/BlogMe/Panels/PostProjects.vue")
          },
          {
            path: "articles",
            component: () => import("@/components/BlogMe/Panels/PostArticles.vue")
          }
        ]
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/components/Pages/BlogUser.vue"),
        redirect: "/user/login",
        children: [
          {
            path: "login",
            component: () => import("@/components/BlogUser/BlogLogin.vue")
          },
          {
            path: "register",
            component: () => import("@/components/BlogUser/BlogRegister.vue")
          }
        ],
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router