<script lang="ts" setup>
import { ref } from 'vue';
import { EColor, EInputType, NButton, NInput, NLabel } from '@/shared';

import { SubjectSelect, useTeacherStore } from '@/entities';

/**
 * * Стор для работы с тестами
 */
const teacherStore = useTeacherStore();

/**
 * * Название
 */
const name = ref('');
/**
 * * Email
 */
const email = ref('');
/**
 * * Предмет
 */
const subjectId = ref<number>();
/**
 * * Пароль
 */
const password = ref('');

/**
 * * Создать тест
 */
async function createTeacher() {
  if (!name.value || !email.value || !password.value || !subjectId.value)
    return;
  await teacherStore
    .createSchoolTeacher(
      name.value,
      email.value,
      password.value,
      subjectId.value
    )
    .then(() => {
      name.value = '';
      email.value = '';
      password.value = '';
    });
}
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Имя" id="teacher-name">
        <NInput
          v-model="name"
          id="teacher-name"
          placeholder="Введите имя учителя"
        />
      </NLabel>
      <NLabel label="Email" id="teacher-email">
        <NInput
          v-model="email"
          id="teacher-email"
          placeholder="Введите email"
        />
      </NLabel>
      <NLabel label="Предмет" id="teacher-subject">
        <SubjectSelect v-model="subjectId" id="teacher-subject" />
      </NLabel>
      <NLabel label="Пароль" id="teacher-password">
        <NInput
          v-model="password"
          :type="EInputType.Password"
          id="teacher-password"
          placeholder="Введите пароль"
        />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="createTeacher">
        Создать учителя
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
