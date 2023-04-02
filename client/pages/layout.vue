<template>
    <div class="layout">
        <page-header />
        <page-wrapper>
            <router-view />
        </page-wrapper>
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="less">
.layout {
    min-height: 100vh;
    width: 100%;
    background-color: var(--color-gray-light);

    .page-wrapper {
        margin-top: 16px;
    }
}
</style>