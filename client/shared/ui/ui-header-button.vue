<template>
    <div :class="componentClass" @click="onClick">
        <slot />
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import router from '../../app/router/router';

/**Параметры компонента */
const props = defineProps({
    /**Активна ли кнопка */
    active: { type: Boolean, default: false },
    /**Роут к которому привязана кнопка */
    route: { type: String, default: "" },
})

/**Класс компонента */
const componentClass = computed(() => ({
    "ui-header-button": 1,
    "active": router.currentRoute.value.name == props.route
}))

/**Клик по компоненту */
const onClick = () => {
    router.push({ name: props.route });
};

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
        transform: scale(1.1);
    }

    &.active {
        color: var(--color-active);
    }
}
</style>