<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/entities';

import { NInput, EInputType, EColor, NButton, NLabel } from '@/shared';

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
  await userStore
    .login(email.value, password.value)
    .then(() => {
      router.push({ name: 'results' });
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>

<template>
  <form class="login-form f fd-col rg-3" @submit.prevent>
    <div class="f fd-col">
      <NLabel label="Email" id="user-email">
        <NInput
          v-model="email"
          id="user-email"
          placeholder="Введите ваш Email"
        />
      </NLabel>
      <NLabel label="Пароль" id="user-password">
        <NInput
          class="pr-0"
          v-model="password"
          id="user-password"
          placeholder="Введите ваш пароль"
          :type="EInputType.Password"
        />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="login"> Войти </NButton>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
