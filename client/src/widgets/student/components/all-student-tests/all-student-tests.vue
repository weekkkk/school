<script lang="ts" async setup>
import { useStudentStore, StudentTestTable } from '@/entities';

/**
 * * Стор для учеников
 */
const studentStore = useStudentStore();

if (!studentStore.studentTests) {
  await studentStore.getTests();
}
</script>

<template>
  <StudentTestTable
    v-if="studentStore.studentTests?.length"
    :student-tests="studentStore.studentTests.slice()"
  />
  <div v-else class="ta-c">
    <p>Нет ни одного теста</p>
  </div>
</template>

<style lang="less" scoped></style>
