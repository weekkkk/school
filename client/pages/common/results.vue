<template>
    <div class="results">
        <ui-dropdown :items="items" :selectedId="selectedId" @select="selectedId = $event" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([
    { Id: 0, Name: "qwe" },
    { Id: 1, Name: "asd" },
    { Id: 2, Name: "zxc" },
    { Id: 3, Name: "cxz" },
    { Id: 4, Name: "dsa" },
])
const selectedId = ref(0)
</script>
<style lang="less" scoped></style>