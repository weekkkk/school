<template>
    <div class="ui-table">
        <div v-for="(row, index) in rows" class="ui-table-row" :class="getRowClass(index)">
            <div v-for="cell in row" class="ui-table-cell">
                {{ cell }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue';

/**Параметры компонента */
const props = defineProps({
    /**Данные таблицы
     * Формат: первый массив - заголовок, остальные - значения
     * Пример: 
     * [
     *  ["Header"],
     *  ["Value"]
     * ]
     */
    data: { type: Array as PropType<string[][]>, default: () => [] }
})

/**Обрезанные по длине первого массива строки */
const rows = computed(() => {
    if (!props.data) return [];
    let rowLength = props.data[0].length;
    return props.data.map(d => d.filter((x, i) => i < rowLength));
})

/**Получение класса для ряда */
const getRowClass = (index: number) => {
    return {
        header: index == 0,
    }
}
</script>
<style lang="less" scoped>
.ui-table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-default);
    overflow: hidden;
    gap: 1px;
    background-color: var(--color-gray);
    border: 1px solid var(--color-gray);
    color: var(--color-text);

    .ui-table-row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 100%;
        gap: 1px;

        &.header {
            .ui-table-cell {
                background-color: var(--color-light-gray);
            }
        }

        .ui-table-cell {
            display: flex;
            align-items: center;
            padding: 0 8px;
            min-height: 40px;
            width: 100%;
            background-color: var(--color-default);
        }
    }
}
</style>