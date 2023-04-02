<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ISchool } from '../../interfaces';

const props = defineProps({
  /**
   * * Школы
   */
  schools: { type: Array as PropType<ISchool[]>, default: [] },
});
</script>

<template>
  <table>
    <tr>
      <th>Название</th>
      <th>Email</th>
    </tr>
    <tr v-for="school in schools" :key="school.id">
      <td>{{ school.name }}</td>
      <td>{{ school.email }}</td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
