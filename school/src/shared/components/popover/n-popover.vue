<script lang="ts" setup>
import {
  type PropType,
  ref,
  nextTick,
  computed,
  onUnmounted,
  reactive,
  onMounted,
} from 'vue';
import { EColor } from '../enums';
import { EPosition } from './enums';
/**
 * * Свойства
 */
const props = defineProps({
  /**
   * * Позиция
   */
  position: { type: String as PropType<EPosition>, default: EPosition.Auto },
  /**
   * * Цвет
   */
  color: { type: String as PropType<EColor>, default: EColor.Default },
  /**
   * * Ширина
   */
  width: { type: String, default: 'auto' },
  /**
   * * Классы контента
   */
  classes: { type: String, default: '' },
  /**
   * * Режим тултипа
   */
  tooltip: { type: Boolean, default: false },
  /**
   * * Неактивность
   */
  disabled: { type: Boolean, default: false },
  /**
   * * Неактивность телепорта
   */
  noTeleport: { type: Boolean, default: false },
});
/**
 * * События
 */
const emit = defineEmits<{
  (e: 'open', target: HTMLElement): void;
  (e: 'close', target: HTMLElement): void;
  (e: 'focus', target: HTMLElement): void;
  (e: 'blur', target: HTMLElement): void;
}>();
/**
 * * Видимость
 */
const visible = ref(false);
/**
 * * Элемент
 */
const $element = ref<HTMLElement>();
/**
 * * Поповер
 */
const $content = ref<HTMLElement>();
/**
 * * Внутри
 */
const $inner = ref<HTMLElement>();
/**
 * * Треугольник
 */
const $triangle = ref<HTMLElement>();
/**
 * * Координаты поповера
 */
const content = reactive({ x: 0, y: 0 });
/**
 * * Координаты треугольника
 */
const triangle = reactive({ x: 0, y: 0 });
/**
 * * Позиция
 */
const _position = ref(props.position);
/**
 * * Клик по элементу
 */
function focus() {
  if (visible.value && !props.tooltip) close();
  else {
    if (visible.value) return;
    open();
    if (!$element.value) return;
    emit('focus', $element.value);
  }
}

/**
 * * Высчитать позицию
 */
function calc(
  p: EPosition,
  about: DOMRect,
  rect: DOMRect,
  i = 0
): { x: number; y: number; position: EPosition } {
  const bw = getComputedStyle(document.documentElement)
    .getPropertyValue('--n-popover-tr')
    .replace('px', '');
  const br = getComputedStyle(document.documentElement)
    .getPropertyValue('--n-popover-br')
    .replace('px', '');
  const min = Number(bw) * 2 + Number(br);
  const settings = { x: 0, y: 0, position: p };
  const ignore = i == 4;
  if (ignore) {
    const indets = [
      about.left,
      document.documentElement.clientWidth - about.right,
      about.top,
      document.documentElement.clientHeight - about.bottom,
    ];
    switch (indets.indexOf(Math.max(...indets))) {
      case 0:
        p = EPosition.Left;
        break;
      case 1:
        p = EPosition.Right;
        break;
      case 2:
        p = EPosition.Top;
        break;
      case 3:
        p = EPosition.Bottom;
        break;
    }
    settings.position = p;
  }

  switch (p) {
    case EPosition.Top:
      settings.x = about.left + about.width / 2 - rect.width / 2;
      settings.y = about.top - rect.height;

      if (settings.x < 0) settings.x = 0;
      else if (settings.x + rect.width > document.documentElement.clientWidth)
        settings.x = document.documentElement.clientWidth - rect.width;

      if (
        !ignore &&
        (settings.y < 0 ||
          about.right - document.documentElement.clientWidth >=
            about.width / 2 - min ||
          about.left <= -about.width / 2 + min)
      )
        return calc(EPosition.Right, about, rect, i + 1);
      break;
    case EPosition.Left:
      settings.y = about.top + about.height / 2 - rect.height / 2;
      settings.x = about.left - rect.width;

      if (settings.y < 0) settings.y = 0;
      else if (settings.y + rect.height > document.documentElement.clientHeight)
        settings.y = document.documentElement.clientHeight - rect.height;

      if (
        !ignore &&
        (settings.x < 0 ||
          about.bottom - document.documentElement.clientHeight >=
            about.height / 2 - min ||
          about.top <= -about.height / 2 + min)
      )
        return calc(EPosition.Top, about, rect, i + 1);
      break;
    case EPosition.Right:
      settings.y = about.top + about.height / 2 - rect.height / 2;
      settings.x = about.right;

      if (settings.y < 0) settings.y = 0;
      else if (settings.y + rect.height > document.documentElement.clientHeight)
        settings.y = document.documentElement.clientHeight - rect.height;

      if (
        !ignore &&
        (settings.x + rect.width > document.documentElement.clientWidth ||
          about.bottom - document.documentElement.clientHeight >=
            about.height / 2 - min ||
          about.top <= -about.height / 2 + min)
      )
        return calc(EPosition.Bottom, about, rect, i + 1);
      break;
    case EPosition.Bottom:
      settings.x = about.left + about.width / 2 - rect.width / 2;
      settings.y = about.bottom;

      if (settings.x < 0) settings.x = 0;
      else if (settings.x + rect.width > document.documentElement.clientWidth)
        settings.x = document.documentElement.clientWidth - rect.width;

      if (
        !ignore &&
        (settings.y + rect.height > document.documentElement.clientHeight ||
          about.right - document.documentElement.clientWidth >=
            about.width / 2 - min ||
          about.left <= -about.width / 2 + min)
      )
        return calc(EPosition.Left, about, rect, i + 1);
      break;
    case EPosition.Auto:
      return calc(EPosition.Top, about, rect);
  }
  return settings;
}
/**
 * * Инициализация позиций элементов
 */
async function init() {
  await nextTick();
  if (!$element.value || !$content.value) return;

  const elementRect = $element.value.getBoundingClientRect();

  const contentRect = $content.value.getBoundingClientRect();
  const contentSettings = calc(props.position, elementRect, contentRect);
  content.x = contentSettings.x;
  content.y = contentSettings.y;
  _position.value = contentSettings.position;

  await nextTick();
  if (!$triangle.value) return;
  const triangleRect = $triangle.value.getBoundingClientRect();
  const triangleSettings = calc(_position.value, elementRect, triangleRect);
  triangle.x = triangleSettings.x;
  triangle.y = triangleSettings.y;
}
/**
 * * При загрузке компонента
 */
onMounted(() => {
  if (!$element.value || props.disabled) return;
  $element.value.addEventListener('click', focus);
  if (!props.tooltip) return;
  $element.value.addEventListener('mouseover', focus);
});
/**
 * * Открыть
 */
async function open() {
  if (visible.value) return;
  visible.value = true;
  await init();
  if (!props.disabled) {
    window.addEventListener('click', click);
    if (props.tooltip && $element.value && $inner.value) {
      $element.value.addEventListener('mouseout', mouseout);
      $inner.value.addEventListener('mouseout', mouseout);
      window.addEventListener('scroll', close);
      window.addEventListener('resize', close);
    } else {
      window.addEventListener('scroll', init);
      window.addEventListener('resize', init);
    }
  }
  await nextTick();
  if ($inner.value) emit('open', $inner.value);
}
/**
 * * Закрыть
 */
function close() {
  if (!visible.value) return;
  visible.value = false;
  if (!props.disabled) {
    window.removeEventListener('click', click);
    if (props.tooltip && $element.value && $inner.value) {
      $element.value.removeEventListener('mouseout', mouseout);
      $inner.value.removeEventListener('mouseout', mouseout);
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    } else {
      window.removeEventListener('scroll', init);
      window.removeEventListener('resize', init);
    }
  }
  if (!$inner.value) return;
  emit('close', $inner.value);
}
/**
 * * Убрать фокус
 */
function blur(target: HTMLElement) {
  if (
    !target ||
    !$inner.value ||
    $inner.value == target ||
    $inner.value.contains(target) ||
    !$element.value ||
    $element.value == target ||
    $element.value.contains(target) ||
    !$triangle.value ||
    $triangle.value == target ||
    $triangle.value.contains(target)
  )
    return;
  emit('blur', target);
  close();
}
/**
 * * Блюр щелчком
 */
function click(e: Event) {
  const target = e.target as HTMLElement;
  blur(target);
}
/**
 * * Блюр наведением
 */
function mouseout(e: MouseEvent) {
  const target = e.relatedTarget as HTMLElement;
  blur(target);
}
/**
 * * При разрушении компонента
 */
onUnmounted(close);
/**
 * * Поделиться с родителем
 */
defineExpose({
  open,
  close,
});
</script>

<template>
  <div class="n-popover_element" ref="$element">
    <Teleport to="body" :disabled="noTeleport">
      <Transition name="n-popover_animation">
        <div class="n-popover_container" v-if="visible" :class="color">
          <div
            ref="$triangle"
            class="n-popover_triangle"
            :class="[_position, color]"
            :style="{ left: `${triangle.x}px`, top: `${triangle.y}px` }"
          />
          <div
            ref="$content"
            class="n-popover_content"
            :style="{ left: `${content.x}px`, top: `${content.y}px` }"
            :class="[_position, color]"
          >
            <div
              ref="$inner"
              class="inner"
              :class="[_position, color, classes]"
              :style="{
                width,
              }"
            >
              <slot name="content" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <slot />
  </div>
</template>

<style lang="scss">
:root {
  --n-popover-c: inherit;
  --n-popover-bg: var(--n-default);
  --n-popover-tr: 6px;
  --n-popover-br: 16px;
  --n-popover-sh: 0 0 16px;
  --n-popover-sh-a: 0.2;
  --n-popover-sh-c: var(--n-second-50);
  --n-popover-ts: none;
}
</style>

<style lang="scss" scoped>
$color: var(--n-popover-c);
$bg: var(--n-popover-bg);
$shadow: var(--n-popover-sh) var(--n-popover-sh-c);
$triangle: var(--n-popover-tr);
$radius: var(--n-popover-br);
$min: calc($triangle * 2 + $radius * 2);
$transition: var(--n-popover-ts);

.n-popover {
  &_element {
    display: inline-flex;
    width: fit-content;
    height: fit-content;
  }

  &_content {
    position: fixed;
    padding: $triangle;
    color: $color;

    .inner {
      background-color: $bg;
      box-shadow: $shadow;
      border-radius: $radius;
      min-height: $min;
      min-width: $min;

      &.top,
      &.bottom {
        max-width: 100%;
      }

      &.left,
      &.right {
        max-height: 100%;
      }
    }
    &.top,
    &.bottom {
      max-width: 100%;
    }

    &.left,
    &.right {
      max-height: 100%;
    }
  }

  &_triangle {
    position: fixed;
    max-height: 0;
    max-width: 0;
    border-style: solid;
    border-color: transparent;
    z-index: 1;
    border-width: $triangle;

    &.top {
      border-top-color: $bg;
      border-bottom-width: 0;
    }

    &.bottom {
      border-top-width: 0;
      border-bottom-color: $bg;
    }

    &.left {
      border-right-width: 0;
      border-left-color: $bg;
    }

    &.right {
      border-left-width: 0;
      border-right-color: $bg;
    }
  }

  &_container {
    position: absolute;
    z-index: 1000;
    &.brand {
      --n-popover-bg: var(--n-brand);
    }
    &.success {
      --n-popover-bg: var(--n-success);
    }
    &.warn {
      --n-popover-bg: var(--n-warn);
    }
    &.danger {
      --n-popover-bg: var(--n-danger);
    }
    &.second {
      --n-popover-bg: var(--n-second-100);
    }
    &.base {
      --n-popover-bg: var(--n-base);
    }
    &.brand {
      --n-popover-bg: var(--n-brand);
    }
    &:not(.default) {
      --n-popover-c: var(--n-default);
    }
    &:not(.default) {
      --n-popover-sh-c: var(--n-popover-bg);
    }
  }

  &_animation-enter-active,
  &_animation-leave-active {
    transition: $transition;
  }

  &_animation-enter-from,
  &_animation-leave-to {
    opacity: 0;
  }
}
</style>
