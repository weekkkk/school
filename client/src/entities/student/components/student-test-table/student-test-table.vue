<script lang="ts" setup>
import type { PropType } from 'vue';
import type { IStudentTest } from '../../interfaces';

const props = defineProps({
  /**
   * * Ученики
   */
  studentTests: { type: Array as PropType<IStudentTest[]>, default: [] },
});
</script>

<template>
  <table>
    <tr>
      <th>Название</th>
      <th>Email</th>
      <th>Предмет</th>
    </tr>
    <tr v-for="studentTest in studentTests" :key="studentTest.id">
      <td>{{ studentTest.classroom.name }}</td>
      <td>{{ studentTest.test.name }}</td>
      <td>{{ studentTest.test.subject.name }}</td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
