<template>
    <div class="create-test">
        <ui-label name="Школа">
            <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <ui-label name="Предмет">
            <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <ui-label name="Вариант">
            <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <ui-label name="Файл" borderBottom>
            <ui-button thema="gray" class="pin-file-button">
                Прикрепить файл
            </ui-button>
        </ui-label>
        <ui-button class="create-test-button">
            Создать тестирование
        </ui-button>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([])
const selectedId = ref(0)
</script>
<style lang="less" scoped>
.create-test {
    .pin-file-button {
        margin-left: auto;
    }

    .create-test-button {
        margin: 16px 0 0 auto;
    }
}
</style>