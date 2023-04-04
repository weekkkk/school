<template>
    <div v-if="file" ref="$docPreview" />
</template>
<script lang="ts" setup>
import { PropType, computed, ref, watch } from 'vue';
/**Параметры компонента */
const props = defineProps({
    /**Отображаемый файл */
    file: { type: Object as PropType<File>, default: null }
})

const $docPreview = ref<HTMLDivElement>(null)

/**Поле для отслеживания изменений параметра file */
const file = computed(() => props.file);

/**Отслеживание изменений параметра file */
watch(file, onUpdateFile)

function onUpdateFile() {
    if (!file.value) return;
    docx.renderAsync(file.value, $docPreview.value)
}
</script>
<style lang="less" scoped>
.ui-text {
    font-weight: 500;
    font-size: 16px;
    color: var(--color-text);
    padding: 10px;
    background-color: var(--color-gray-light);
    border-radius: 16px;
    width: 100%;
}
</style>