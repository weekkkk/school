<script lang="ts" setup>
const props = defineProps({
  /**
   * * Подпись
   */
  label: { type: String, default: '' },
  /**
   * * ID поля
   */
  id: { type: String, default: '' },
});
</script>

<template>
  <div class="n-label py-3 cg-3 rg-2">
    <div>
      <label :for="id" class="fw-medium c-second-100">{{ label }}</label>
    </div>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.n-label {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  @media (max-width: 532px) {
    grid-template-columns: 1fr;
  }
  border-bottom: 1px solid var(--n-second-0);
  &:first-child {
    border-top: 1px solid var(--n-second-0);
  }
}
</style>
