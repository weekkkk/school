<template>
    <input type="text" class="ui-input" v-model="innerValue" @input="onInput" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

/**Параметры компонента */
const props = defineProps({
    /**Внешний текст */
    modelValue: { type: String, default: "" }
})
/**События компонента */
const emit = defineEmits(["update:modelValue"]);

/**Введеный текст */
const innerValue = ref("");

const onInput = () => emit("update:modelValue", innerValue.value);
</script>
<style lang="less" scoped>
.ui-input {
    outline: none;
    height: 40px;
    border: 1px solid var(--color-gray);
    border-radius: var(--border-radius-default);
    transition: .2s ease;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);

    &:hover,
    &:active,
    &:focus {
        border-color: var(--color-active);
    }
}
</style>