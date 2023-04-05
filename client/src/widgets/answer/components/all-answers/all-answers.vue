<script lang="ts" async setup>
import { AnswerTable, useAnswerStore } from '@/entities';

const answerStore = useAnswerStore();

if (!answerStore.answers) {
  await answerStore.getAnswers();
}
</script>

<template>
  <AnswerTable
    v-if="answerStore.answers?.length"
    :answers="answerStore.answers"
  />
  <p v-else>Ни один ученик не оставил ответа</p>
</template>

<style lang="less" scoped></style>
