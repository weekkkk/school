<script lang="ts" async setup>
import { useTestStore, TestTable } from '@/entities';

/**
 * * Стор для тестов
 */
const testStore = useTestStore();

if (!testStore.tests) {
  await testStore.getTests();
}
</script>

<template>
  <TestTable v-if="testStore.tests?.length" :tests="testStore.tests.slice()" />
  <div v-else class="ta-c">
    <p>Нет ни одного созданного теста</p>
  </div>
</template>

<style lang="less" scoped></style>
