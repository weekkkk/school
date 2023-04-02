import { createRouter, createWebHistory } from 'vue-router';

import * as widgets from '@/widgets';

import * as pages from '@/pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: widgets.HeaderLayout,
      redirect: { name: 'main' },
      children: [
        {
          path: 'main',
          name: 'main',
          component: pages.MainPage,
        },
        {
          path: 'login',
          name: 'login',
          component: pages.LoginPage,
        },
      ],
    },
  ],
});

export default router;
