import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: "/",
        redirect: "/home",
        component: () => import("./components/template/Layout.vue"),
        children: [
            {
                path: "/home",
                name: "/home",
                component: () => import("./components/Home.vue")
            },
            {
                path: "/hello",
                name: "/hello",
                component: () => import("./components/HelloWorld.vue")
            },
            {
                path: "/user/:id",
                name: "/user",
                props: true,
                component: () => import("./components/User.vue")
            },
            {
                path: "/users",
                name: "/users",
                props: true,
                component: () => import("./components/User.vue")
            },
            {
                path: "/about",
                name: "about",
                component: () => import("./components/About.vue")
            },
        ]
    },
    {
        path: "/auth",
        name: "Login",
        component: () => import("./components/auth/Login.vue")
    },
    {
        path: "/404",
        name: "404",
        component: () => import("./components/NotFound.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404"
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})