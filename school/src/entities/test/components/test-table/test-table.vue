<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ITest } from '../../interfaces';

const props = defineProps({
  /**
   * * Тесты
   */
  tests: { type: Array as PropType<ITest[]>, default: [] },
});
</script>

<template>
  <table>
    <tr>
      <th>Вариант</th>
      <th>Предмет</th>
      <th>Файл</th>
    </tr>
    <tr v-for="test in tests" :key="test.id">
      <td>{{ test.name }}</td>
      <td>{{ test.subject.name }}</td>
      <td>
        <a :href="test.file">Ссылка</a>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped></style>
