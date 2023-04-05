<script lang="ts" setup>
import { type PropType, ref, computed } from 'vue';
import NInput from '../input/n-input.vue';
import { EType } from '../input/enums';
import { EColor, ESize } from '../enums';
import NButton from '../button/n-button.vue';
/**
 * * Свойства
 */
const props = defineProps({
  /**
   * * Значения
   */
  modelValue: { type: Number, default: undefined },
  /**
   * * Заполнитель
   */
  placeholder: { type: String, default: '' },
  /**
   * * Минимум
   */
  min: { type: Number, default: undefined },
  /**
   * * Максимум
   */
  max: { type: Number, default: undefined },
  /**
   * * Шаг
   */
  step: { type: Number, default: 1 },
  /**
   * * Размер
   */
  size: { type: String as PropType<ESize>, default: ESize.Default },
  /**
   * * Успех
   */
  success: { type: Boolean, default: false },
  /**
   * * Предупеждение
   */
  warn: { type: Boolean, default: false },
  /**
   * * Ошибка
   */
  danger: { type: Boolean, default: false },
  /**
   * * Неактивность
   */
  disabled: { type: Boolean, default: false },
  /**
   * * Ввод значения вручную
   */
  input: { type: Boolean, default: false },
  /**
   * * Поле только для чтения
   */
  readonly: { type: Boolean, default: false },
  /**
   * * ID инпута
   */
  id: { type: String, default: '' },
  /**
   * * Иконка шага ниже
   */
  downIcon: { type: String, default: undefined },
  /**
   * * Иконка шага выше
   */
  upIcon: { type: String, default: undefined },
});
/**
 * * События
 */
const emit = defineEmits<{
  /**
   * Обновление значения
   */
  (e: 'update:modelValue', newValue: number | undefined): void;
  /**
   * Фокус на инпут
   */
  (e: 'focus', target: HTMLInputElement): void;
  /**
   * Снятие фокуса с инпута
   */
  (e: 'blur', target: HTMLInputElement): void;
  /**
   * Шаг выше
   */
  (e: 'up', newValue: number): void;
  /**
   * Шаг ниже
   */
  (e: 'down', newValue: number): void;
}>();
/**
 * * Контрол
 */
const control = ref<InstanceType<typeof NInput>>();
/**
 * * Обновление значения
 */
function update(value: number | string | undefined) {
  let newValue: string | number | undefined = value;
  if (typeof newValue == 'string') newValue = undefined;
  emit('update:modelValue', newValue);
}
/**
 * * Меньше
 */
function down() {
  const input = control.value?.$field as HTMLInputElement;
  input.stepDown();
  emit('down', Number(input.value));
  update(Number(input.value));
}
/**
 * * Больше
 */
function up() {
  const input = control.value?.$field as HTMLInputElement;
  input.stepUp();
  emit('up', Number(input.value));
  update(Number(input.value));
}
/**
 * * При фокусе
 */
function onFocus(input: HTMLInputElement | HTMLTextAreaElement) {
  if (input instanceof HTMLTextAreaElement) return;
  emit('focus', input);
}
/**
 * * При снятии фокуса
 */
function onBlur(input: HTMLInputElement | HTMLTextAreaElement) {
  if (input instanceof HTMLTextAreaElement) return;
  let value = props.modelValue;
  if (value == undefined) return;
  if (props.max != undefined && value > props.max) {
    input.stepDown();
    update(Number(input.value));
  } else if (props.min != undefined && value < props.min) {
    input.stepUp();
    update(Number(input.value));
  }
  emit('blur', input);
}
/**
 * * Минильно ли значение
 */
const isMin = computed(
  () =>
    props.min != undefined &&
    props.modelValue != undefined &&
    props.modelValue - props.step < props.min
);
/**
 * * Максимально ли значение
 */
const isMax = computed(
  () =>
    props.max != undefined &&
    props.modelValue != undefined &&
    props.modelValue + props.step > props.max
);
/**
 * * Поделиться
 */
defineExpose({
  up,
  down,
  focus: control.value?.focus,
  blur: control.value?.blur,
  $field: control.value?.$field,
});
</script>

<template>
  <NInput
    class="n-counter"
    ref="control"
    :model-value="modelValue == undefined ? '' : modelValue"
    @update:model-value="update($event)"
    @blur="onBlur"
    @focus="onFocus"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :step="step"
    :size="size"
    :type="EType.Number"
    :success="success"
    :warn="warn"
    :danger="danger"
    :disabled="disabled"
    :readonly="!input || readonly"
    :id="id"
  >
    <template #before>
      <div class="n-counter-action_before lh-no fw-medium">
        <NButton
          @click="down"
          @mousedown.prevent="control?.focus"
          :color="EColor.Brand"
          :size="size"
          :disabled="disabled || isMin || readonly"
          square
          no-fill
          :before-icon="downIcon"
        >
          <slot name="down">
            <span class="fs-h1">-</span>
          </slot>
        </NButton>
      </div>
    </template>
    <template #after>
      <div class="n-counter-action_after lh-no fw-medium">
        <NButton
          @click="up"
          @mousedown.prevent="control?.focus"
          :color="EColor.Brand"
          :size="size"
          :disabled="disabled || isMax || readonly"
          square
          no-fill
          :after-icon="upIcon"
        >
          <slot name="up">
            <span class="fs-h1">+</span>
          </slot>
        </NButton>
      </div>
    </template>
  </NInput>
</template>

<style lang="scss" scoped>
$bw: var(--n-input-bw);
$px: var(--n-input-px);
$sz: var(--n-input-sz);
$bc: var(--n-ctrl-bc);
.n-counter {
  text-align: center;
  overflow: hidden;
  min-width: calc($sz * 3);
  --n-input-px: var(--n-input-py);
  &-action {
    &_before,
    &_after {
      display: inline-flex;
      --n-button-bw: 0;
      outline: $bw solid $bc;
      outline-offset: calc($bw * -1);
    }
    &_before {
      margin-left: calc($px * -1);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &_after {
      margin-right: calc($px * -1);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
