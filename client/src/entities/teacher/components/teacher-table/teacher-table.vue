<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ITeacher } from '../../interfaces';

const props = defineProps({
  /**
   * * Школы
   */
  teachers: { type: Array as PropType<ITeacher[]>, default: [] },
});
</script>

<template>
  <table>
    <tr>
      <th>Название</th>
      <th>Email</th>
    </tr>
    <tr v-for="teacher in teachers" :key="teacher.id">
      <td>{{ teacher.name }}</td>
      <td>{{ teacher.email }}</td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
