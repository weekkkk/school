<script lang="ts" setup>
import type { PropType } from 'vue';
import type { IResult } from '../../interfaces';

const props = defineProps({
  results: { type: Array as PropType<readonly IResult[]>, required: true },
});
</script>

<template>
  <table>
    <tr>
      <th>Имя</th>
      <th>Тест</th>
      <th>Оценка ответа</th>
    </tr>
    <tr v-for="result in results" :key="result.answer.id">
      <td>
        {{ result.answer.student.name }}
      </td>
      <td>
        {{ result.test.name }}
      </td>
      <td>
        {{ result.answer.grade }}
      </td>
    </tr>
  </table>
</template>

<style lang="less" scoped></style>
