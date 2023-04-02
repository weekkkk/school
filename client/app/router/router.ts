import * as VueRouter from 'vue-router'
import * as RouterName from "./router-names"
import Layout from "../../pages/layout.vue"
import MainPage from "../../pages/common/main-page.vue"
import Results from "../../pages/common/results.vue"
import CreateTest from "../../pages/admin/create-test.vue"
import CreateUser from "../../pages/school/create-user.vue"
import CreateSchool from "../../pages/admin/create-school.vue"
import CreateClass from "../../pages/teacher/create-class.vue"
import CreateMaterial from "../../pages/teacher/create-material.vue"
import Variants from "../../pages/teacher/variants.vue"
import Test from "../../pages/student/test.vue"
import Answers from "../../pages/student/answers.vue"
import StudentResults from "../../pages/student/results.vue"
import Materials from "../../pages/student/materials.vue"

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
                },
                {
                    name: RouterName.CREATE_USER,
                    path: `/${RouterName.CREATE_USER}`,
                    component: CreateUser,
                },
                {
                    name: RouterName.CREATE_SCHOOL,
                    path: `/${RouterName.CREATE_SCHOOL}`,
                    component: CreateSchool,
                },
                {
                    name: RouterName.CREATE_CLASS,
                    path: `/${RouterName.CREATE_CLASS}`,
                    component: CreateClass,
                },
                {
                    name: RouterName.CREATE_MATERIAL,
                    path: `/${RouterName.CREATE_MATERIAL}`,
                    component: CreateMaterial,
                },
                {
                    name: RouterName.VARIANTS,
                    path: `/${RouterName.VARIANTS}`,
                    component: Variants,
                },
                {
                    name: RouterName.TEST,
                    path: `/${RouterName.TEST}`,
                    component: Test,
                },
                {
                    name: RouterName.ANSWERS,
                    path: `/${RouterName.ANSWERS}`,
                    component: Answers,
                },
                {
                    name: RouterName.STUDENT_RESULTS,
                    path: `/${RouterName.STUDENT_RESULTS}`,
                    component: StudentResults,
                },
                {
                    name: RouterName.MATERIALS,
                    path: `/${RouterName.MATERIALS}`,
                    component: Materials,
                },                
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