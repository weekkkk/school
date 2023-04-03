<script lang="ts" setup>
import { ref } from 'vue';
import { EColor, EInputType, NButton, NInput, NLabel } from '@/shared';

import { useStudentStore } from '@/entities';

/**
 * * Стор для работы с тестами
 */
const studentStore = useStudentStore();

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
async function createStudent() {
  if (!name.value || !email.value || !password.value) return;
  await studentStore.createSchoolStudent(name.value, email.value, password.value).then(() => {
    name.value = '';
    email.value = '';
    password.value = '';
  });
}
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Имя" id="student-name">
        <NInput
          v-model="name"
          id="student-name"
          placeholder="Введите имя ученика"
        />
      </NLabel>
      <NLabel label="Email" id="student-email">
        <NInput v-model="email" id="student-email" placeholder="Введите email" />
      </NLabel>
      <NLabel label="Пароль" id="student-password">
        <NInput
          v-model="password"
          :type="EInputType.Password"
          id="student-password"
          placeholder="Введите пароль"
        />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="createStudent">
        Создать ученика
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
