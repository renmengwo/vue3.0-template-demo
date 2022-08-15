import {createRouter, createWebHistory, RouterOptions} from "vue-router";

const errorrPath = {
    path: '*', redirect: '/404', hidden: true
}
const constantRoutes:any[] = []
const asyncRoutes = []

const history = createWebHistory();
const router = createRouter(<RouterOptions>{
    history,
    routes: constantRoutes
})

export default router
