<script lang="ts" setup>
import { AnswerGradeForm } from '@/widgets';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div>
    <AnswerGradeForm :answer-id="Number(route.params.id)" />
  </div>
</template>

<style lang="less" scoped></style>
