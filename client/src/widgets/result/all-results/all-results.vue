<script lang="ts" setup>
import { ResultTable, useResultStore } from '@/entities';

const resultStore = useResultStore();
</script>

<template>
  <ResultTable v-if="resultStore.results" :results="resultStore.results" />
  <p v-else>Ничего не найдено</p>
</template>

<style lang="less" scoped></style>
