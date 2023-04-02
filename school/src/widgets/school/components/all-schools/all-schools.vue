<script lang="ts" async setup>
import { useSchoolStore, SchoolTable } from '@/entities';

/**
 * * Стор для тестов
 */
const schoolStore = useSchoolStore();

if (!schoolStore.schools) {
  await schoolStore.getSchools();
}
</script>

<template>
  <SchoolTable v-if="schoolStore.schools?.length" :schools="schoolStore.schools.slice()" />
  <div v-else class="ta-c">
    <p>Нет ни одного созданной школы</p>
  </div>
</template>

<style lang="less" scoped></style>
