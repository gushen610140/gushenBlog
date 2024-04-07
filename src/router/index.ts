import {createRouter, createWebHashHistory} from "vue-router"

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
                component: () => import("@/views/pages/BlogProjects.vue")
            },
            {
                path: "articles",
                name: "articles",
                component: () => import("@/views/pages/BlogArticles.vue")
            },
            {
                path: "mood",
                name: "mood",
                component: () => import("@/components/Pages/BlogMood.vue")
            },
            {
                path: "me",
                name: "me",
                component: () => import("@/views/pages/BlogPost.vue"),
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