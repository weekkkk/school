<template>
    <div class="page-wrapper">
        <slot />
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="less">
.page-wrapper {
    background-color: var(--color-default);
    padding: 24px;
    border-radius: var(--border-radius-default);
    width: 100%;
    margin: 0 auto;
    max-width: var(--page-width);
    position: relative;
}
</style>