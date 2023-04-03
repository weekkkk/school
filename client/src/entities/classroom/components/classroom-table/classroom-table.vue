<script lang="ts" async setup>
import type { PropType } from 'vue';
import type { IClassroom } from '../../interfaces';
import { useTestStore } from '../../../test';

/**
 * * Стор тестов
 */
const testStore = useTestStore();

if (!testStore.tests) {
  await testStore.getTests();
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
      <th>Тесты</th>
    </tr>
    <tr v-for="classroom in classrooms" :key="classroom.id">
      <td>{{ classroom.name }}</td>
      <td>
        <span v-for="(testId, index) in classroom.testIds" :key="testId">
          {{ testStore.findById(testId)?.name
          }}<span v-if="index != classroom.testIds.length - 1">,</span>
        </span>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
