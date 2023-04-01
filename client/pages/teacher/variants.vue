<template>
    <div class="variants-wrapper">
        <ui-table :data="data" showPreviewButtons v-if="!selectedVaiant" />
        <ui-table v-else="!selectedVaiant" :data="data" showPreviewButtons v-if="!selectedVaiant" />
        <student-answers v-else="selectedPupil" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data =
    [
        ["Предмет", "Вариант"],
        ["", ""],
        ["", ""]
    ]

const selectedVaiant = ref();
const selectedPupil = ref();
</script>
<style lang="less" scoped>
.variants-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>