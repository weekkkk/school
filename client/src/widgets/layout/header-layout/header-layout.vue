<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { EColor, ESize, NButton } from '@/shared';

import { useUserStore } from '@/entities';

const router = useRouter();

/**
 * * Стор для работы с пользователями
 */
const userStore = useUserStore();

async function logout() {
  await userStore.logout().then(() => {
    router.push({ name: 'main' });
  });
}
</script>

<template>
  <div class="header-layout f fd-col">
    <header class="f jc-c fw-medium p-3 bg-default">
      <div class="container f ai-c jc-sb">
        <h4>Тестирование ЕГЭ</h4>

        <div class="f ai-c cg-3 rg-2 fw-wrap">
          <RouterLink :to="{ name: 'main' }"> Главная </RouterLink>

          <div
            class="f cg-3 rg-2 fw-wrap"
            v-if="userStore.user?.role == 'ADMIN'"
          >
            <RouterLink :to="{ name: 'results' }"> Результаты </RouterLink>
            <RouterLink :to="{ name: 'tests' }"> Тесты </RouterLink>
            <RouterLink :to="{ name: 'schools' }"> Школы </RouterLink>
          </div>

          <div
            class="f cg-3 rg-2 fw-wrap"
            v-if="userStore.user?.role == 'SCHOOL'"
          >
            <RouterLink :to="{ name: 'students' }"> Ученики </RouterLink>
            <RouterLink :to="{ name: 'teachers' }"> Учителя </RouterLink>
          </div>

          <div
            class="f cg-3 rg-2 fw-wrap"
            v-if="userStore.user?.role == 'TEACHER'"
          >
            <RouterLink :to="{ name: 'answers' }"> Ответы </RouterLink>
            <RouterLink :to="{ name: 'classrooms' }"> Классы </RouterLink>
            <RouterLink :to="{ name: 'materials' }"> Материалы </RouterLink>
          </div>

          <div
            class="f cg-3 rg-2 fw-wrap"
            v-if="userStore.user?.role == 'STUDENT'"
          >
            <RouterLink :to="{ name: 'student-tests' }"> Тесты </RouterLink>
            <RouterLink :to="{ name: 'materials' }"> Материалы </RouterLink>
          </div>

          <NButton
            v-if="!userStore.user"
            :color="EColor.Brand"
            :size="ESize.Small"
            no-fill
            @click="router.push({ name: 'login' })"
          >
            Вход
          </NButton>
          <NButton
            v-else
            :color="EColor.Danger"
            :size="ESize.Small"
            no-fill
            @click="logout"
          >
            Выход
          </NButton>
        </div>
      </div>
    </header>

    <div class="p-3 f jc-c">
      <main class="container bg-default p-3 br-3">
        <Suspense :timeout="0">
          <RouterView />
          <template #fallback> Loading... </template>
        </Suspense>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-layout {
  width: 100%;
  flex-grow: 1;
  header {
    a {
      color: var(--n-base);
      text-decoration: none;
      &.router-link-active {
        color: var(--n-brand);
      }
    }
  }
  .container {
    position: relative;
    overflow: hidden;
    max-width: 1024px;
    flex-grow: 1;
  }
}
</style>
