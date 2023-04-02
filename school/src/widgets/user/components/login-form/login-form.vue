<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/entities';

import { NInput, EInputType, EColor, NButton } from '@/shared';

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
  <form class="login-form f fd-col rg-3" @submit.prevent>
    <div class="f fd-col">
      <div class="form-row py-3 cg-3 rg-2">
        <div>
          <label for="user-email" class="fw-medium c-second-100">Email</label>
        </div>

        <NInput
          v-model="email"
          id="user-email"
          placeholder="Введите ваш Email"
        />
      </div>

      <div class="form-row py-3 cg-3 rg-2">
        <div>
          <label for="user-password" class="fw-medium c-second-100"
            >Пароль</label
          >
        </div>

        <NInput
          class="pr-0"
          v-model="password"
          id="user-password"
          placeholder="Введите ваш пароль"
          :type="EInputType.Password"
        />
      </div>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand"> Войти </NButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  @media (max-width: 532px) {
    grid-template-columns: 1fr;
  }
  border-bottom: 1px solid var(--n-second-0);
  &:first-child {
    border-top: 1px solid var(--n-second-0);
  }
}
</style>
