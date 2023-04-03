<script lang="ts" async setup>
import { useClassroomStore, ClassroomTable } from '@/entities';

/**
 * * Стор для тестов
 */
const classroomStore = useClassroomStore();

if (!classroomStore.classrooms) {
  await classroomStore.getClassrooms();
}
</script>

<template>
  <ClassroomTable
    v-if="classroomStore.classrooms?.length"
    :classrooms="classroomStore.classrooms.slice()"
  />
  <div v-else class="ta-c">
    <p>Нет ни одного созданного класса учителя</p>
  </div>
</template>

<style lang="less" scoped></style>
