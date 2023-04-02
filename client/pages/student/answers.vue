<template>
    <div class="answers-wrapper">
        <ui-label name="Предмет" borderBottom>
            <ui-dropdown :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <ui-button class="show-answers-button" @click="showAnswers">
            Показать ответы
        </ui-button>
        <ui-table class="answers-table" :data="data" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([])
const selectedId = ref(0)

/**Клик по кнопке показать ответы */
const showAnswers = () => {
    data.value = [
        ["Вариант", "Задание 1", "Задание 2", "Задание 3"],
        ["", "", "", ""],
        ["", "", "", ""]
    ]
}
</script>
<style lang="less" scoped>
.answers-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .show-answers-button {
        margin: 16px 0 16px auto;
    }
}
</style>