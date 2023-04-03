<script lang="ts" async setup>
import { NSelect } from '@/shared';

import { useStudentStore } from '../../stores';
import { computed, type PropType } from 'vue';

/**
 * * Стор для работы с предметами
 */
const studentStore = useStudentStore();

if (!studentStore.students) {
  await studentStore.getSchoolStudents();
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
const options = studentStore.students?.map((student) => student.name) || [];

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[] | undefined): void;
}>();

const value = computed({
  get: () => {
    return studentStore.students
      ?.filter((student) => props.modelValue?.includes(student.id))
      ?.map((student) => student.name);
  },
  set: (newValue: string[] | undefined) => {
    emit(
      'update:modelValue',
      studentStore.students
        ?.filter((student) => newValue?.includes(student.name))
        ?.map((student) => student.id)
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
