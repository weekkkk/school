<script lang="ts" setup>
import type { PropType } from 'vue';
import type { IStudent } from '../../interfaces';

const props = defineProps({
  /**
   * * Школы
   */
  students: { type: Array as PropType<IStudent[]>, default: [] },
});
</script>

<template>
  <table>
    <tr>
      <th>Название</th>
      <th>Email</th>
    </tr>
    <tr v-for="student in students" :key="student.id">
      <td>{{ student.name }}</td>
      <td>{{ student.email }}</td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
