<script lang="ts" setup>
import { useAnswerStore } from '@/entities';
import { NLabel, NCounter, NButton, EColor } from '@/shared';
import { ref } from 'vue';

const props = defineProps({
  answerId: { type: Number, required: true },
});

const answerStore = useAnswerStore();
await answerStore.getAnswer(props.answerId);

/**
 * * Оценка
 */
const grade = ref(answerStore.answer?.grade);

async function setGrade() {
  if (!grade.value) return;
  await answerStore.setGrade(props.answerId, grade.value);
}
</script>

<template>
  <form class="f fd-col rg-3" @submit.prevent>
    <h4>Ответ ученика {{ answerStore.answer?.student.name }}</h4>

    <div class="f fd-col">
      <NLabel label="Оценка">
        <NCounter
          v-model="grade"
          :max="100"
          :min="0"
          input
          placeholder="Введите оценку"
        />
      </NLabel>
    </div>
    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="setGrade">
        Сохранить оценку
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
