<template>
    <div class="results">
        <ui-docx-preview />
        <ui-label name="Школа">
            <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <ui-label name="Предмет">
            <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <ui-label name="Вариант" borderBottom>
            <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <div class="show-results-button-wrapper">
            <ui-button>
                Показать результаты
            </ui-button>
        </div>
        <ui-table :data="data" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([])
const selectedId = ref(0)
const data =
    [
        ["ФИО", "Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ]
</script>
<style lang="less" scoped>
.results {
    .show-results-button-wrapper {
        display: flex;
        margin: 16px 0 24px;
        justify-content: flex-end;
    }
}
</style>