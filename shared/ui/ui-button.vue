<template>
    <div class="ui-button" :class="thema" @click="onClick">
        <slot />
    </div>
</template>
<script lang="ts" setup>
/**Параметры компонента */
const props = defineProps({
    /**Тема */
    thema: { type: String, default: "blue" }
})
/**События компонента */
const emit = defineEmits(["click"]);

/**Клик по компоненту */
const onClick = () => emit("click");

</script>
<style lang="less" scoped>
.ui-button {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: fit-content;
    border-radius: var(--border-radius-default);
    padding: 0 16px;
    font-size: 16px;
    font-weight: 500;
    min-height: 40px;
    cursor: pointer;
    transition: .2s ease;

    &.blue {
        color: var(--color-default);
        background-color: var(--color-active);
        border: 3px solid var(--color-active);

        &:hover {
            color: var(--color-active);
            background-color: var(--color-default);
        }
    }

    &.gray {
        color: var(--color-default);
        background-color: var(--color-gray);
        border: 3px solid var(--color-gray);

        &:hover {
            color: var(--color-gray);
            background-color: var(--color-default);
        }
    }
}
</style>