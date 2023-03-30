import * as VueRouter from 'vue-router'
import * as RouterName from "./router-names"
import Layout from "../../pages/layout.vue"
import MainPage from "../../pages/common/main-page.vue"
import Results from "../../pages/common/results.vue"
import CreateTest from "../../pages/admin/create-test.vue"

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
                    component: MainPage,
                },
                {
                    name: RouterName.RESULTS,
                    path: `/${RouterName.RESULTS}`,
                    component: Results,
                },
                {
                    name: RouterName.CREATE_TEST,
                    path: `/${RouterName.CREATE_TEST}`,
                    component: CreateTest,
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