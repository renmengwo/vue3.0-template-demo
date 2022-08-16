import {createRouter, createWebHistory, RouterOptions} from "vue-router";
import Layout from '@/layout/index.vue';
import UserRouters from './modules/user'
const errorrPath = {
    path: '*', redirect: '/404', hidden: true
}
const constantRoutes:any[] = [
    {
        path: '/login',
        hidden: true,
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/index',
        hidden: true,
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import(/* webpackChunkName: "layout" */'@/views/main.vue')
            }
        ]
    }

]
const asyncRoutes = [
    UserRouters
]

const history = createWebHistory();
const router = createRouter(<RouterOptions>{
    history,
    routes: constantRoutes
})

export default router
