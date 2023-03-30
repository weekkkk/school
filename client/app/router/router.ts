import * as VueRouter from 'vue-router'
import Layout from "../../pages/layout.vue"
import * as RouterName from "./router-names"

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: RouterName.MAIN
        },
        {
            name: RouterName.MAIN,
            path: `/${RouterName.MAIN}`,
            component: Layout,
            // children: [
            //     meta: {
            //         accesses: [EnumRole.Admin]
            //     }
            // ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.name) router.push({ name: RouterName.MAIN });
    next();
})

export default router;