<script lang="ts" setup>
import { SubjectSelect, useResultStore, SchoolSelect } from '@/entities';
import { EColor, NButton, NLabel } from '@/shared';

const resultStore = useResultStore();
</script>

<template>
  <form @submit.prevent class="f fd-col rg-3">
    <div class="f fd-col">
      <NLabel label="Школа">
        <SchoolSelect v-model="resultStore.resultFilter.schoolId" />
      </NLabel>
      <NLabel label="Предмет">
        <SubjectSelect v-model="resultStore.resultFilter.subjectId" />
      </NLabel>
    </div>

    <div class="f jc-fe">
      <NButton :color="EColor.Brand" @click="resultStore.getResults">
        Поиск
      </NButton>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
