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
        path: "/projects",
        name: "projects",
        component: () => import("@/components/Pages/BlogProjects.vue")
      },
      {
        path: "/articles",
        name: "articles",
        component: () => import("@/components/Pages/BlogArticles.vue")
      },
      {
        path: "/mood",
        name: "mood",
        component: () => import("@/components/Pages/BlogMood.vue")
      },
      {
        path: "/me",
        name: "me",
        component: () => import("@/components/Pages/BlogMe.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router