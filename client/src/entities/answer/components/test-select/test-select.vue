<script lang="ts" async setup>
import { NSelect } from '@/shared';

import { useTestStore } from '../../stores';
import { computed, type PropType } from 'vue';

/**
 * * Стор для работы с предметами
 */
const testStore = useTestStore();

if (!testStore.tests) {
  await testStore.getTests();
}

const props = defineProps({
  /**
   * * Id  выбранного предмета
   */
  modelValue: { type: Array as PropType<number[]> },
});

/**
 * * Опции
 */
const options = testStore.tests?.map((test) => test.name) || [];

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[] | undefined): void;
}>();

const value = computed({
  get: () => {
    return testStore.tests
      ?.filter((test) => props.modelValue?.includes(test.id))
      ?.map((test) => test.name);
  },
  set: (newValue: string[] | undefined) => {
    emit(
      'update:modelValue',
      testStore.tests
        ?.filter((test) => newValue?.includes(test.name))
        ?.map((test) => test.id)
    );
  },
});
</script>

<template>
  <NSelect
    v-model="value"
    multi
    :options="options"
    placeholder="Выберите предмет"
  />
</template>
