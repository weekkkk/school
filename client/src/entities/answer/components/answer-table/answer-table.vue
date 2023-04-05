<script lang="ts" setup>
import type { PropType } from 'vue';
import type { IAnswer } from '../../interfaces';

const props = defineProps({
  /**
   * * Ответы
   */
  answers: { type: Array as PropType<readonly IAnswer[]> },
});
</script>

<template>
  <table>
    <tr>
      <th>Ученик</th>
      <th></th>
    </tr>
    <tr v-for="answer in answers" :key="answer.id">
      <td>{{ answer.student.name }}</td>
      <td>
        <RouterLink :to="{ name: 'answer', params: { id: answer.id } }">
          Проверить
        </RouterLink>
      </td>
    </tr>
  </table>
</template>

<style lang="less" scoped></style>
