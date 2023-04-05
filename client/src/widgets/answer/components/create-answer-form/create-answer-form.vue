<script lang="ts" setup>
import { ref } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';
import { EColor, NButton, NFile, NInput, NLabel } from '@/shared';

import { useAnswerStore } from '@/entities';

const route = useRoute();

/**
 * * Стор для работы с тестами
 */
const answerStore = useAnswerStore();

/**
 * * Файл
 */
const file = ref<File>();

/**
 * * Создать тест
 */
async function createAnswer() {
  const classroomAnswerId = Number(route.params.id);
  if (!file.value || !classroomAnswerId) return;
  await answerStore.create(classroomAnswerId, file.value).then(() => {
    file.value = undefined;
  });
}

onBeforeRouteUpdate(async (to, from, next) => {
  await createAnswer();
  next();
});

onBeforeRouteLeave(async (to, from, next) => {
  await createAnswer();
  next();
});
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Файл" id="answer-subject">
        <NFile v-model="file" id="answer-subject" />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="createAnswer">
        Создать ответ
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
