<template>
    <div :class="componentClass">
        <div class="ui-label-name" v-html="name" />
        <div class="ui-label-slot">
            <slot />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
/**Параметры компонента */
const props = defineProps({
    /**Подпись к лейблу */
    name: { type: String, default: "" },
    /**Отображение границы снизу */
    borderBottom: { type: Boolean, default: false }
})

/**Класс компонента */
const componentClass = computed(() => ({
    "ui-label": 1,
    "border-bottom": props.borderBottom
}))
</script>
<style lang="less" scoped>
.ui-label {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-top: 1px solid var(--color-gray-light);
    gap: 16px;
    width: 100%;

    &.border-bottom {
        border-bottom: 1px solid var(--color-gray-light);
    }

    .ui-label-name {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 16px;
        color: var(--color-gray-dark);
        word-break: break-word;
    }

    .ui-label-slot {
        min-width: 624px;
        max-width: 624px;
    }
}
</style>