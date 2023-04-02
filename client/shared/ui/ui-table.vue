<template>
    <div class="ui-table" v-if="data.length">
        <div v-for="(row, index) in rows" class="ui-table-row" :class="getRowClass(index)">
            <div v-for="cell in row" class="ui-table-cell" :style="cellStyle">
                {{ cell }}
            </div>
            <template v-if="showEditButtons">
                <div class="ui-table-cell additional">
                    <img v-if="index" src="../../app/assets/images/delete.png" alt="delete">
                </div>
                <div class="ui-table-cell additional">
                    <img v-if="index" src="../../app/assets/images/edit.png" alt="edit">
                </div>
            </template>
            <template v-if="showPreviewButtons">
                <div class="ui-table-cell additional">
                    <img v-if="index" src="../../app/assets/images/download.png" alt="download">
                </div>
                <div class="ui-table-cell additional">
                    <img v-if="index" src="../../app/assets/images/preview.png" alt="preview">
                </div>
            </template>
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
    data: { type: Array as PropType<string[][]>, default: () => [] },
    /**Показывать кнопки для редактирования и удаления элементов */
    showEditButtons: { type: Boolean, default: false },
    /**Показывать кнопки для предпросмотра и скачивания элементов */
    showPreviewButtons: { type: Boolean, default: false }
})

/**Обрезанные по длине первого массива строки */
const rows = computed(() => {
    if (!props.data) return [];
    let rowLength = props.data[0].length;
    return props.data.map(d => d.filter((x, i) => i < rowLength));
})
/**Количество доп. ячеек */
const additionalCells = computed(() => {
    let additionalCells = 0
    if (props.showEditButtons) additionalCells += 2;
    if (props.showPreviewButtons) additionalCells += 2;
    return additionalCells;
})
/**Количество ячеек */
const cellsCount = computed(() => {
    return rows.value[0].length + additionalCells.value;
})
/**Стили для ячейки */
const cellStyle = computed(() => {
    let mainCells = cellsCount.value - additionalCells.value;
    let additionalCellsPx = additionalCells.value * 50 / mainCells;
    return { "min-width": `calc(${100 / mainCells}% - ${additionalCellsPx}px)` }
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
    width: 100%;

    .ui-table-row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 100%;
        gap: 1px;

        &.header {
            .ui-table-cell {
                background-color: var(--color-gray-light);
            }
        }

        .ui-table-cell {
            display: flex;
            align-items: center;
            padding: 0 8px;
            min-height: 40px;
            width: 100%;
            background-color: var(--color-default);
            overflow: hidden;

            &.additional {
                max-width: 50px;
                cursor: pointer;

                img {
                    max-height: 30px;
                    width: auto;
                }
            }
        }
    }
}
</style>