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

        {
          path: 'results',
          name: 'results',
          component: pages.ResultsPage,
        },
      ],
    },
  ],
});

export default router;

import { useUserStore, type IUser } from '@/entities';

router.beforeEach(async (to, from, next) => {
  const { title } = to.meta;
  const brand = '';
  if (title) document.title = `${brand}${title as string}`;

  const userStore = useUserStore();

  if (!userStore.isAuthChecked) {
    await userStore.checkAuth();
  }

  const user: IUser | undefined = userStore.user;
  const toName = to.name?.toString() || '';

  if (!user && toName != 'main' && toName != 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});
