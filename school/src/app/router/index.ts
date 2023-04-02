import { createRouter, createWebHistory } from 'vue-router';
import { HeaderLayout } from '@/widgets';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HeaderLayout,
    },
  ],
});

export default router;
