<template>
    <div contenteditable="true" ref="$textarea" class="ui-textarea" :value="innerValue" @input="onInput" @paste="onPaste" />
</template>
<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';

/**Параметры компонента */
const props = defineProps({
    /**Внешний текст */
    modelValue: { type: String, default: "" }
})
/**События компонента */
const emit = defineEmits(["update:modelValue"]);

/**Введеный текст */
const innerValue = ref("");
/**DOM элемент компонента */
const $textarea = ref<HTMLDivElement>(null);

/**Поле для отслеживания изменений параметра modelValue */
const modelValue = computed(() => props.modelValue);

/**Отслеживание изменений параметра modelValue */
watch(modelValue, onUpdateModelValue)

/**После рендера компонента */
onMounted(() => onUpdateModelValue())

/**Заполнение текстом innerValue и DOM элемента, при обновлении параметра modelValue */
function onUpdateModelValue() {
    innerValue.value = props.modelValue;
    $textarea.value.innerText = props.modelValue;
}
/**Ввод текста */
const onInput = () => emit("update:modelValue", innerValue.value);
/**Вставка из буфера текста, а не DOM элементов */
const onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    var text = ((e as any).originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertHTML", false, text);
}
</script>
<style lang="less" scoped>
.ui-textarea {
    width: 100%;
    outline: none;
    min-height: 80px;
    border: 1px solid var(--color-gray);
    border-radius: var(--border-radius-default);
    transition: .2s ease;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
    overflow: hidden;
    resize: none;

    &:hover,
    &:active,
    &:focus {
        border-color: var(--color-active);
    }
}
</style>