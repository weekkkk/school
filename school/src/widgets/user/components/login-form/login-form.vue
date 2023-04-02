<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '@/entities';

import { NInput, EInputType, EColor } from '@/shared';

const router = useRouter();

/**
 * * Стор для работы с пользователями
 */
const userStore = useUserStore();

/**
 * * Почта
 */
const email = ref('');
/**
 * * Пароль
 */
const password = ref('');

/**
 * * Вход
 */
async function login() {
  await userStore.login(email.value, password.value).then(() => {
    router.push({ name: 'default' });
  });
}
</script>

<template>
  <form class="f fd-col" @submit.prevent>
    <div class="form-row py-3 cg-3 rg-2">
      <div>
        <label for="user-email" class="fw-medium c-second-100">Email</label>
      </div>

      <NInput v-model="email" id="user-email" placeholder="Введите ваш Email" />
    </div>

    <div class="form-row py-3 cg-3 rg-2">
      <div>
        <label for="user-password" class="fw-medium c-second-100">Пароль</label>
      </div>

      <NInput
        class="pr-0"
        v-model="password"
        id="user-password"
        placeholder="Введите ваш пароль"
        :type="EInputType.Password"
      />
    </div>

    <div class="form-row g-3">
      <div class="f jc-c cg-3">
        <NButton :color="EColor.Brand"> Войти </NButton>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
