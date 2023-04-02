<script lang="ts" setup>
import { PropType } from 'vue';
import { EColor } from '../enums';
import { getColorVar } from '../functions';
/**
 * * Свойства
 */
const props = defineProps({
  /**
   * * Имя
   */
  name: { type: String, default: '' },
  /**
   * * Фото
   */
  image: { type: String, default: '' },
  /**
   * * Цвет
   */
  color: { type: String as PropType<EColor>, default: EColor.Brand },
  /**
   * * Размер
   */
  size: { type: String, default: '20px' },
  /**
   * * Отношение сторон
   */
  aspect: { type: Number, default: 1 },
});
/**
 * * Переменная цвета
 */
const colorVar = getColorVar(props.color);
</script>

<template>
  <div class="n-avatar">
    <slot>
      <img v-if="image" :src="image" alt="Image" />
      <span v-else-if="name">
        {{ name[0] }}
      </span>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
$a: 0.5;
$color: v-bind(colorVar);
$fw: var(--n-fw-medium);

.n-avatar {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: v-bind(size);
  border-radius: calc(v-bind(size) / 2);
  aspect-ratio: v-bind(aspect);
  font-weight: $fw;
  span {
    line-height: 1;
    font-size: calc(v-bind(size) / 2);
    color: $color;
    z-index: 1;
  }
  &::before {
    content: '';
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-color: $color;
    opacity: $a;
  }
  img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
