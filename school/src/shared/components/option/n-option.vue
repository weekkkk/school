<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { ESize } from '../enums';
import { EType } from './enums';
/**
 * * Свойства
 */
const props = defineProps({
  /**
   * * Тип
   */
  type: { type: String as PropType<EType>, default: EType.Radio },
  /**
   * * Значение
   */
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  /**
   * * Значение
   */
  value: { type: [String, Number], default: undefined },
  /**
   * * Имя группы
   */
  name: { type: String, default: 'option-group' },
  /**
   * * Размер
   */
  size: { type: String as PropType<ESize>, default: ESize.Default },
  /**
   * * Иконка перед слотом
   */
  beforeIcon: { type: String, default: undefined },
  /**
   * * Иконка после слота
   */
  afterIcon: { type: String, default: undefined },
});
/**
 * * События
 */
const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: string | number | (string | number)[] | undefined
  ): void;
}>();
/**
 * * Значение
 */
const localvalue = computed({
  get: (): string | number | (string | number)[] | undefined => {
    return props.modelValue;
  },
  set: (newValue: string | number | (string | number)[] | undefined) => {
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <li class="n-option">
    <input
      :type="type"
      v-model="localvalue"
      :value="value"
      :name="name"
      :id="`${name}-${value}`"
    />
    <label
      class="n-option-label"
      :for="`${name}-${value}`"
      :class="[`n-option-size_${size}`]"
    >
      <i class="icon" v-if="beforeIcon" :class="beforeIcon" />
      <slot>{{ value }}</slot>
      <i class="icon" v-if="afterIcon" :class="afterIcon" />
    </label>
  </li>
</template>

<style lang="scss">
:root {
  --n-option-bg: var(--n-default);
  --n-option-px: var(--n-ctrl-default-px);
  --n-option-py: var(--n-ctrl-default-py);
  --n-option-sz: var(--n-ctrl-default-sz);
  --n-option-bw: var(--n-ctrl-bw);
  --n-option-bc: var(--n-ctrl-bc);
  --n-option-is: var(--n-ctrl-is);
}
</style>

<style lang="scss" scoped>
$bg: var(--n-option-bg);
$px: var(--n-option-px);
$py: var(--n-option-py);
$sz: var(--n-option-sz);
$bw: var(--n-option-bw);
$bc: var(--n-option-bc);
$is: var(--n-option-is);
.n-option {
  display: flex;
  width: 100%;
  input {
    display: none;
    &:hover + .n-option-label {
      filter: brightness(95%);
    }
    &:active + .n-option-label,
    &:checked + .n-option-label {
      filter: brightness(90%);
      &:hover {
        filter: brightness(92.5%);
      }
    }
  }
  &-label {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    color: inherit;
    width: 100%;
    gap: $px;
    padding: $py $px;
    background-color: $bg;
    min-height: $sz;
    transition: 0.15s ease-in-out;
    i.icon {
      line-height: 1;
      font-size: $is;
    }
  }
  &-size {
    &_small {
      --n-option-px: var(--n-ctrl-small-px);
      --n-option-py: var(--n-ctrl-small-py);
      --n-option-sz: var(--n-ctrl-small-sz);
    }
    &_default {
      --n-option-px: var(--n-ctrl-default-px);
      --n-option-py: var(--n-ctrl-default-py);
      --n-option-sz: var(--n-ctrl-default-sz);
    }
    &_large {
      --n-option-px: var(--n-ctrl-large-px);
      --n-option-py: var(--n-ctrl-large-py);
      --n-option-sz: var(--n-ctrl-large-sz);
    }
  }
}
</style>
