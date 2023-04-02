<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  /**
   * * Значение
   */
  modelValue: { type: File },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null | undefined): void;
}>();

/**
 * * Изменить файл
 * @param e
 */
function changeFile(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  console.log(files?.item(0));
  emit('update:modelValue', files?.item(0));
}
</script>

<template>
  <input
    @change="changeFile"
    type="file"
    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  />
</template>

<style lang="less" scoped></style>
