<script lang="ts" setup>
import { ref } from 'vue';
import { EColor, NButton, NFile, NInput, NLabel } from '@/shared';

import { SubjectSelect, useTestStore } from '@/entities';

/**
 * * Стор для работы с тестами
 */
const testStore = useTestStore();

/**
 * * Предмет
 */
const subjectId = ref<number>();
/**
 * * Название
 */
const name = ref('');
/**
 * * Файл
 */
const file = ref<File>();

/**
 * * Создать тест
 */
async function createTest() {
  if (!name.value || !subjectId.value || !file.value) return;
  await testStore.create(name.value, subjectId.value, file.value).then(() => {
    name.value = '';
    subjectId.value = undefined;
    file.value = undefined;
  });
}
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Вариант" id="test-name">
        <NInput
          v-model="name"
          id="test-name"
          placeholder="Введите имя варианта"
        />
      </NLabel>

      <NLabel label="Предмет" id="test-subject">
        <SubjectSelect v-model="subjectId" />
      </NLabel>

      <NLabel label="Файл" id="test-subject">
        <NFile v-model="file" id="test-subject" />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="createTest">
        Создать тест
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
