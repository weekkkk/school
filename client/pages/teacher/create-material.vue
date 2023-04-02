<template>
    <div class="create-material">
        <ui-label name="Название">
            <ui-input />
        </ui-label>
        <ui-label name="Описание">
            <ui-textarea />
        </ui-label>
        <ui-label name="Файл" borderBottom>
            <ui-button thema="gray" class="pin-file-button">
                Прикрепить файл
            </ui-button>
        </ui-label>
        <div class="create-material-button-wrapper">
            <ui-button>
                Создать материал
            </ui-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped>
.create-material {
    .pin-file-button {
        margin-left: auto;
    }

    .create-material-button-wrapper {
        display: flex;
        margin: 16px 0 24px;
        justify-content: flex-end;
    }
}
</style>