<script lang="ts" async setup>
import type { PropType } from 'vue';
import type { IClassroom } from '../../interfaces';
import { useSubjectStore } from '../../../subject';

/**
 * * Стор предметов
 */
const subjectStore = useSubjectStore();

if (!subjectStore.subjects) {
  await subjectStore.getSubjects();
}

const props = defineProps({
  /**
   * * Школы
   */
  classrooms: { type: Array as PropType<IClassroom[]>, default: [] },
});
</script>

<template>
  <table>
    <tr>
      <th>Название</th>
    </tr>
    <tr v-for="classroom in classrooms" :key="classroom.id">
      <td>{{ classroom.name }}</td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
