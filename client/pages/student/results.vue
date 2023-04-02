<template>
    <div class="results-wrapper">
        <ui-label name="Предмет" borderBottom>
            <ui-dropdown :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <ui-button class="show-results-button" @click="showresults">
            Показать результаты
        </ui-button>
        <ui-table class="results-table" :data="data" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([])
const selectedId = ref(0)

/**Клик по кнопке показать результаты */
const showresults = () => {
    data.value = [
        ["Вариант", "Балл"],
        ["", ""],
        ["", ""]
    ]
}
</script>
<style lang="less" scoped>
.results-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .show-results-button {
        margin: 16px 0 16px auto;
    }
}
</style>