<script lang="ts" setup>
import { type PropType, computed, ref } from 'vue';
import { EType } from './enums';
import { ESize } from '../enums';
/**
 * * Свойства
 */
const props = defineProps({
  /**
   * * Значение
   */
  modelValue: { type: [String, Number], default: undefined },
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
   * * Кол-во строк в комметарии
   */
  rows: { type: Number, default: 3 },
  /**
   * * Тип
   */
  type: { type: String as PropType<EType>, default: EType.Text },
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
   * * Поле только для чтения
   */
  readonly: { type: Boolean, default: false },
  /**
   * * ID инпута
   */
  id: { type: String, default: '' },
  /**
   * * Автозаполнение
   */
  autocomplete: { type: String, default: undefined },
  /**
   * * Имя
   */
  name: { type: String, default: undefined },
});
/**
 * * События
 */
const emit = defineEmits<{
  /**
   * Обновление значения
   */
  (e: 'update:modelValue', value: string | number | undefined): void;
  /**
   * Фокус на инпут
   */
  (e: 'focus', target: HTMLInputElement | HTMLTextAreaElement): void;
  /**
   * Снятие фокуса с инпута
   */
  (e: 'blur', target: HTMLInputElement | HTMLTextAreaElement): void;
}>();
/**
 * * Значения
 */
const value = computed<string | number | undefined>({
  get: () => props.modelValue,
  set: (value: string | number | undefined) => emit('update:modelValue', value),
});
/**
 * * Значение фокуса
 */
const isFocus = ref(false);
/**
 * * При фокусе
 */
function onFocus(e: Event) {
  isFocus.value = true;
  emit('focus', e.target as HTMLInputElement);
}
/**
 * * При снятии фокуса
 */
function onBlur(e: Event) {
  isFocus.value = false;
  emit('blur', e.target as HTMLInputElement);
}
/**
 * * Поле для ввода
 */
const $field = ref<HTMLInputElement | HTMLTextAreaElement>();
/**
 * * Фокус
 */
function focus() {
  if (!$field.value) return;
  $field.value.focus();
}
/**
 * * Снятие фокуса
 */
function blur() {
  if (!$field.value) return;
  $field.value.blur();
}
/**
 * * Поделиться
 */
defineExpose({
  focus,
  blur,
  $field,
});
</script>

<template>
  <div
    class="n-input"
    :class="[
      {
        'n-input_bool-focus': isFocus,
        'n-input_bool-success': success,
        'n-input_bool-warn': warn,
        'n-input_bool-danger': danger,
        'n-input_bool-disabled': disabled,
      },
      `n-input_type-${type}`,
      `n-input_size-${size}`,
    ]"
  >
    <slot name="before" />
    <slot>
      <input
        v-if="type != EType.Textarea"
        ref="$field"
        v-model="value"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        @focus="onFocus"
        @blur="onBlur"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :id="id"
        :autocomplete="autocomplete"
        :name="name"
      />
      <textarea
        v-else
        ref="$field"
        v-model="value"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
      />
    </slot>
    <slot name="after" />
  </div>
</template>

<style lang="scss">
:root {
  --n-input-bg: var(--n-default);
  --n-input-px: var(--n-ctrl-default-px);
  --n-input-py: var(--n-ctrl-default-py);
  --n-input-br: var(--n-ctrl-default-br);
  --n-input-sz: var(--n-ctrl-default-sz);
  --n-input-bw: var(--n-ctrl-bw);
  --n-input-bc: var(--n-ctrl-bc);
  --n-input-br: var(--n-ctrl-br);
}
</style>

<style lang="scss" scoped>
$bg: var(--n-input-bg);
$px: var(--n-input-px);
$py: var(--n-input-py);
$br: var(--n-input-br);
$sz: var(--n-input-sz);
$bw: var(--n-input-bw);
$bc: var(--n-input-bc);
$br: var(--n-input-br);
.n-input {
  display: inline-flex;
  align-items: center;
  border: none;
  padding-left: $px;
  padding-right: $px;
  column-gap: $px;
  outline: $bw solid $bc;
  outline-offset: calc($bw * -1);
  border-radius: $br;
  background-color: $bg;
  min-height: $sz;
  input,
  textarea {
    border: none;
    outline: none;
    background: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    text-align: inherit;
    cursor: inherit;
    width: 100%;
    padding: 0;
    &::placeholder {
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      color: var(--n-second-50);
    }
  }
  input {
    line-height: $sz;
    &[type='number'] {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: inherit;
    -webkit-box-shadow: 0 0 0px 1000px var(--n-default) inset;
    transition: background-color 5000s ease-in-out 0s;
    font-family: inherit;
  }
  textarea {
    line-height: inherit;
    resize: none;
    height: 100%;
  }
  &_type-textarea {
    padding-top: $py;
    padding-bottom: $py;
    min-height: $sz;
  }
  &_size {
    &-small {
      --n-input-px: var(--n-ctrl-small-px);
      --n-input-py: var(--n-ctrl-small-py);
      --n-input-sz: var(--n-ctrl-small-sz);
    }
    &-default {
      --n-input-px: var(--n-ctrl-default-px);
      --n-input-py: var(--n-ctrl-default-py);
      --n-input-sz: var(--n-ctrl-default-sz);
    }
    &-large {
      --n-input-px: var(--n-ctrl-large-px);
      --n-input-py: var(--n-ctrl-large-py);
      --n-input-sz: var(--n-ctrl-large-sz);
    }
  }
  &_bool {
    &-focus {
      --n-input-bc: var(--n-brand);
    }
    &-success {
      --n-input-bc: var(--n-success);
    }
    &-warn {
      --n-input-bc: var(--n-warn);
    }
    &-danger {
      --n-input-bc: var(--n-danger);
    }
    &-disabled {
      --n-input-bg: var(--n-second-0);
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
