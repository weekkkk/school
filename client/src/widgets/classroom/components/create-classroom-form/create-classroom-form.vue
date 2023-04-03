<script lang="ts" setup>
import { ref } from 'vue';
import { EColor, EInputType, NButton, NInput, NLabel } from '@/shared';

import { StudentSelect, TestSelect, useClassroomStore } from '@/entities';

/**
 * * Стор для работы с тестами
 */
const classroomStore = useClassroomStore();

/**
 * * Название
 */
const name = ref('');

/**
 * * Ученики
 */
const studentIds = ref<number[]>();

/**
 * * Тесты
 */
const testIds = ref<number[]>();

/**
 * * Создать тест
 */
async function createClassroom() {
  if (!name.value || !studentIds.value?.length || !testIds.value?.length) return;
  await classroomStore.create(name.value, studentIds.value, testIds.value).then(() => {
    name.value = '';
  });
}
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Имя" id="classroom-name">
        <NInput
          v-model="name"
          id="classroom-name"
          placeholder="Введите имя класса"
        />
      </NLabel>

      <NLabel label="Ученики" id="classroom-students">
        <StudentSelect
          v-model="studentIds"
          id="classroom-students"
          placeholder="Выберите учеников"
        />
      </NLabel>

      <NLabel label="Тесты" id="classroom-tests">
        <TestSelect
          v-model="testIds"
          id="classroom-tests"
          placeholder="Выберите тесты"
        />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="createClassroom">
        Создать класс
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
