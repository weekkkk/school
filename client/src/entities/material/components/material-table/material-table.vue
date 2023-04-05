<script lang="ts" setup>
import type { PropType } from 'vue';
import type { IMaterial } from '../../interfaces';

const props = defineProps({
  /**
   * * Тесты
   */
  materials: { type: Array as PropType<IMaterial[]>, default: [] },
});
</script>

<template>
  <table>
    <tr>
      <th>Название</th>
      <th>Предмет</th>
      <th>Файл</th>
    </tr>
    <tr v-for="material in materials" :key="material.id">
      <td>{{ material.name }}</td>
      <td>{{ material.subject.name }}</td>
      <td>
        <a :href="material.file">Ссылка</a>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
