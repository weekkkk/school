<script lang="ts" setup>
import { useUserStore } from '@/entities';
import { CreateMaterialForm, AllMaterials } from '@/widgets';

const userStore = useUserStore();
</script>

<template>
  <div class="f fd-col rg-3">
    <CreateMaterialForm v-if="userStore.user?.role == 'TEACHER'" />

    <AllMaterials />
  </div>
</template>

<style lang="less" scoped></style>
