<script lang="ts" async setup>
import { NSelect } from '@/shared';

import { useSchoolStore } from '../../stores';
import type { ISchool } from '../../interfaces';
import { computed } from 'vue';

/**
 * * Стор для работы с предметами
 */
const schoolStore = useSchoolStore();

if (!schoolStore.schools) {
  await schoolStore.getSchools();
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
const options = schoolStore.schools?.map((school) => school.name) || [];

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void;
}>();

const value = computed({
  get: () => {
    return schoolStore.schools?.find((school) => school.id == props.modelValue)
      ?.name;
  },
  set: (newValue: string | undefined) => {
    emit(
      'update:modelValue',
      schoolStore.schools?.find((school) => school.name == newValue)?.id
    );
  },
});
</script>

<template>
  <NSelect v-model="value" :options="options" placeholder="Выберите предмет" />
</template>
