import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeV2.vue')
    },
    {
        path: '/guide',
        name: 'Guide',
        component: () => import('../views/GuideV2.vue'),
    },
    {
        path: "/page",
        name: "Page",
        component: () => import('../views/PageV2.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
