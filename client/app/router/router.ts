import * as VueRouter from 'vue-router'
import * as RouterName from "./router-names"
import Layout from "../../pages/layout.vue"
import Main from "../../pages/common/main.vue"

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: `/${RouterName.MAIN}`,
            children: [
                {
                    name: RouterName.MAIN,
                    path: `/${RouterName.MAIN}`,
                    component: Main,
                }
            ]
        },
        // children: [
        //     meta: {
        //         accesses: [EnumRole.Admin]
        //     }
        // ]
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.name) router.push({ name: RouterName.MAIN });
    next();
})

export default router;