<template>
    <div class="ui-text" v-html="text" />
</template>
<script lang="ts" setup>
/**Параметры компонента */
const props = defineProps({
    /**Выводимый текст */
    text: { type: String, default: "" }
})

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