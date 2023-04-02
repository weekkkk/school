<script lang="ts" setup>
import { type PropType, computed, ref } from 'vue';
import NPopover from '../popover/n-popover.vue';
import NInput from '../input/n-input.vue';
import NOption from '../option/n-option.vue';
// import { Option } from '../option/models';
import { EPosition } from '../popover/enums';
import { EColor, ESize } from '../enums';
import { EType } from '../option/enums';
import { EType as EInputType } from '../input/enums';
import NButton from '../button/n-button.vue';
/**
 * * Свойства
 */
const props = defineProps({
  /**
   * * Значение
   */
  modelValue: {
    type: [String, Number, Object, Array<string | number | object>],
    default: undefined,
  },
  /**
   * * Опции
   */
  options: {
    type: Array as PropType<(string | number | object)[]>,
    default: [],
  },
  /**
   * * Ключ уникального значения (если значение объект)
   */
  valueKey: {
    type: String,
    default: undefined,
  },
  /**
   * * Имя группы опций
   */
  name: { type: String, default: 'n-select-option_list' },
  /**
   * * Размер
   */
  size: { type: String as PropType<ESize>, default: ESize.Default },
  /**
   * * Кол-во видимых опций
   */
  rows: {
    type: Number,
    default: 3,
  },
  /**
   * * Включить мультиселект
   */
  multi: { type: Boolean, default: false },
  /**
   * * Включить поиск
   */
  search: { type: Boolean, default: false },
});
/**
 * * События
 */
const emit = defineEmits<{
  (
    e: 'update:modelValue',
    newValue:
      | string
      | number
      | object
      | (string | number | object)[]
      | undefined
  ): void;
}>();
if (props.multi) emit('update:modelValue', []);
/**
 * * Получить значение
 */
function getValue<T>(
  option: string | number | object | (string | number | object)[] | undefined
): string | number | undefined {
  let value: string | number | T | undefined | any = undefined;
  if (Array.isArray(option)) value = option.map((el) => getValue(el));
  else if (typeof option == 'object') {
    if (props.valueKey && (option as Object).hasOwnProperty(props.valueKey))
      value = option[props.valueKey as keyof object];
    else console.error('Передаете :value-key');
    if (typeof value == 'object') console.error('Ключ не может быть объектом');
  } else value = option;
  return value;
}
/**
 * * Получить опцию
 */
function getOption(value: string | number | undefined) {
  return props.options.find((option) => getValue(option) == value);
}
/**
 * * Значение
 */
const value = computed({
  get: () => getValue<(string | number)[]>(props.modelValue),
  set: (newValue: string | number | (string | number)[] | undefined) => {
    if (Array.isArray(newValue))
      emit(
        'update:modelValue',
        newValue.map((el) => getOption(el))
      );
    else emit('update:modelValue', getOption(newValue));
  },
});

const searchVal = ref('');

const visibleOptions = computed(() => {
  return props.options.filter((el) => {
    const value = getValue<(string | number)[]>(el);
    if (value == undefined) return false;
    return value
      .toString()
      .toLowerCase()
      .includes(searchVal.value.toLowerCase());
  });
});

function getMark(value: string | number | undefined) {
  if (value == undefined) return;
  var indices = [];
  const str = value.toString();
  const searchValue = searchVal.value;
  if (!searchValue) return str;
  let idx = str.indexOf(searchValue);
  while (idx != -1) {
    indices.push(idx);
    idx = str.indexOf(searchValue, idx + 1);
  }
  const arr = str.split('');
  indices.forEach((el, index) => {
    arr.splice(el + index * 2, 0, '<mark>');
    arr.splice(el + index * 2 + searchValue.length + 1, 0, '</mark>');
  });
  return arr.join('');
}
</script>

<template>
  <NPopover
    class="n-select"
    classes="n-select-popover f fd-col"
    width="320px"
    :position="EPosition.Bottom"
  >
    <NInput
      :type="EInputType.Textarea"
      :rows="1"
      :model-value="getValue(modelValue)"
      :size="size"
      readonly
    >
      <template #default v-if="Array.isArray(modelValue) && modelValue?.length">
        <div class="f fw-wrap g-2">
          <div
            class="bg-second-0 br-1 px-2"
            v-for="option in modelValue"
            :key="getValue(option)"
          >
            {{ getValue(option) }}
          </div>
        </div>
      </template>
    </NInput>

    <template #content>
      <section class="f fd-col p-2">
        <NInput v-model="searchVal" :size="size" placeholder="Поиск" />
      </section>
      <ul
        class="n-select-option_list"
        :style="{
          '--n-select-rows': rows,
          '--n-option-sz': 'var(--n-ctrl-large-sz)',
        }"
      >
        <NOption
          v-model="value"
          v-for="option in visibleOptions"
          :key="getValue(option)?.toString()"
          :value="getValue(option)"
          :size="size"
          :name="name"
          :type="multi ? EType.Checkbox : EType.Radio"
        >
          <span v-html="getMark(getValue(option))" />
          <slot :option="option" />
        </NOption>
      </ul>
    </template>
  </NPopover>
</template>

<style lang="scss">
:root {
  --n-select-rows: 3;
}
</style>

<style lang="scss">
.n-select-popover {
  overflow: hidden;
  padding: var(--n-popover-br) 0;
}
</style>

<style lang="scss" scoped>
.n-select {
  &-option_list {
    display: flex;
    flex-direction: column;
    overflow: auto;
    max-height: calc(var(--n-option-sz) * var(--n-select-rows));
  }
}
</style>
