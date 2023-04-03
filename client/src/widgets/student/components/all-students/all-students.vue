<script lang="ts" async setup>
import { useStudentStore, StudentTable } from '@/entities';

/**
 * * Стор для тестов
 */
const studentStore = useStudentStore();

if (!studentStore.students) {
  await studentStore.getSchoolStudents();
}
</script>

<template>
  <StudentTable v-if="studentStore.students?.length" :students="studentStore.students.slice()" />
  <div v-else class="ta-c">
    <p>Нет ни одного созданного ученика школы</p>
  </div>
</template>

<style lang="less" scoped></style>
