<script lang="ts" async setup>
import { useTeacherStore, TeacherTable } from '@/entities';

/**
 * * Стор для тестов
 */
const teacherStore = useTeacherStore();

if (!teacherStore.teachers) {
  await teacherStore.getSchoolTeachers();
}
</script>

<template>
  <TeacherTable v-if="teacherStore.teachers?.length" :teachers="teacherStore.teachers.slice()" />
  <div v-else class="ta-c">
    <p>Нет ни одного созданного ученика школы</p>
  </div>
</template>

<style lang="less" scoped></style>
