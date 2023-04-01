<template>
    <div class="create-class">
        <ui-label name="Название">
            <ui-input />
        </ui-label>
        <ui-label name="Ученики">
            <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
        </ui-label>
        <div class="create-class-button-wrapper">
            <ui-button>
                Создать класс
            </ui-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([])
const selectedId = ref(0)
</script>
<style lang="less" scoped>
.create-class {
    .create-class-button-wrapper {
        display: flex;
        margin: 16px 0 24px;
        justify-content: flex-end;
    }
}
</style>