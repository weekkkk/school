<script lang="ts" setup>
import { ref } from 'vue';
import { EColor, NButton, NFile, NInput, NLabel } from '@/shared';

import { SubjectSelect, useMaterialStore } from '@/entities';

/**
 * * Стор для работы с тестами
 */
const materialStore = useMaterialStore();

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
async function createMaterial() {
  if (!name.value || !file.value) return;
  await materialStore.create(name.value, file.value).then(() => {
    name.value = '';
    file.value = undefined;
  });
}
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Название" id="material-name">
        <NInput
          v-model="name"
          id="material-name"
          placeholder="Введите имя материала"
        />
      </NLabel>

      <NLabel label="Файл" id="material-subject">
        <NFile v-model="file" id="material-subject" />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="createMaterial">
        Создать материал
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
