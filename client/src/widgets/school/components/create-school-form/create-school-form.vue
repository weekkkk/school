<script lang="ts" setup>
import { ref } from 'vue';
import { EColor, EInputType, NButton, NFile, NInput, NLabel } from '@/shared';

import { SubjectSelect, useSchoolStore } from '@/entities';

/**
 * * Стор для работы с тестами
 */
const schoolStore = useSchoolStore();

/**
 * * Предмет
 */
const subjectId = ref<number>();
/**
 * * Название
 */
const name = ref('');
/**
 * * Email
 */
const email = ref('');
/**
 * * Пароль
 */
const password = ref('');

/**
 * * Создать тест
 */
async function createSchool() {
  if (!name.value || !email.value || !password.value) return;
  await schoolStore.create(name.value, email.value, password.value).then(() => {
    name.value = '';
    email.value = '';
    password.value = '';
  });
}
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Название" id="school-name">
        <NInput
          v-model="name"
          id="school-name"
          placeholder="Введите название"
        />
      </NLabel>
      <NLabel label="Email" id="school-email">
        <NInput v-model="email" id="school-email" placeholder="Введите email" />
      </NLabel>
      <NLabel label="Название" id="school-password">
        <NInput
          v-model="password"
          :type="EInputType.Password"
          id="school-password"
          placeholder="Введите пароль"
        />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="createSchool">
        Создать школу
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
