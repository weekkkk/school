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
        <p>Тестирование ЕГЭ</p>

        <NButton
          v-if="!userStore.user"
          :color="EColor.Brand"
          :size="ESize.Small"
          no-fill
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
    </header>

    <div class="p-3 f jc-c">
      <main class="container bg-default p-3 br-3">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-layout {
  width: 100%;
  flex-grow: 1;
  .container {
    max-width: 1024px;
    flex-grow: 1;
  }
}
</style>
