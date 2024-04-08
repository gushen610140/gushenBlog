import {createRouter, createWebHashHistory} from "vue-router"

import navPage from "@/views/pages/navPage.vue"
import layout from "@/views/layout/layout.vue"

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
                path: "post",
                name: "post",
                component: () => import("@/views/pages/BlogPost.vue"),
                redirect: "/post/projects",
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
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router