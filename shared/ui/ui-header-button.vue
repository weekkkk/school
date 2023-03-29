<template>
    <div class="ui-header-button" @click="onClick">
        <slot />
    </div>
</template>
<script lang="ts" setup>
/**Параметры компонента */
const props = defineProps({
    /**Активна ли кнопка */
    active: { type: Boolean, default: false }
})
/**События компонента */
const emit = defineEmits(["click"]);

/**Клик по компоненту */
const onClick = () => emit("click");

</script>
<style lang="less" scoped>
.ui-header-button {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: fit-content;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 500;
    min-height: 40px;
    cursor: pointer;
    transition: .2s ease;
    color: var(--color-text);

    &:hover {
        background-color: var(--color-gray);
        color: var(--color-default)
    }

    &.active {
        color: var(--color-active);
    }
}
</style>