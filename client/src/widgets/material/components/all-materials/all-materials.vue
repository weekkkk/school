<script lang="ts" async setup>
import { useMaterialStore, MaterialTable } from '@/entities';

/**
 * * Стор для тестов
 */
const materialStore = useMaterialStore();

if (!materialStore.materials) {
  await materialStore.getMaterials();
}
</script>

<template>
  <MaterialTable v-if="materialStore.materials?.length" :materials="materialStore.materials.slice()" />
  <div v-else class="ta-c">
    <p>Нет ни одного созданного материала</p>
  </div>
</template>

<style lang="less" scoped></style>
