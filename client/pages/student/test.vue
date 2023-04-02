<template>
    <div class="test-wrapper">
        <template v-if="!currentTest">
            <ui-label name="Предмет">
                <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
            </ui-label>
            <ui-label name="Вариант">
                <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
            </ui-label>
            <div class="start-test-button">
                <ui-button>
                    Пройти тест
                </ui-button>
            </div>
        </template>
        <student-testing v-else :test="currentTest" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([])
const selectedId = ref(0)
const currentTest = ref(1);
</script>
<style lang="less" scoped>
.test-wrapper {
    display: flex;
    flex-direction: column;

    .start-test-button {
        display: flex;
        margin: 16px 0 24px;
        justify-content: flex-end;
    }
}
</style>