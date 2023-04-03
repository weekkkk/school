<script lang="ts" async setup>
import { NSelect } from '@/shared';

import { useSubjectStore } from '../../stores';
import type { ISubject } from '../../interfaces';
import { computed } from 'vue';

/**
 * * Стор для работы с предметами
 */
const subjectStore = useSubjectStore();

if (!subjectStore.subjects) {
  await subjectStore.getSubjects();
}

const props = defineProps({
  /**
   * * Id  выбранного предмета
   */
  modelValue: { type: Number },
});

/**
 * * Опции
 */
const options = subjectStore.subjects?.map((subject) => subject.name) || [];

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void;
}>();

const value = computed({
  get: () => {
    return subjectStore.subjects?.find(
      (subject) => subject.id == props.modelValue
    )?.name;
  },
  set: (newValue: string | undefined) => {
    emit(
      'update:modelValue',
      subjectStore.subjects?.find((subject) => subject.name == newValue)
        ?.id
    );
  },
});
</script>

<template>
  <NSelect
    v-model="value"
    :options="options"
    placeholder="Выберите предмет"
  />
</template>
