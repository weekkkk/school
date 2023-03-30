<template>
    <div class="create-school">
        <ui-label name="Название">
            <ui-input />
        </ui-label>
        <ui-label name="Файл" borderBottom>
            <ui-button thema="gray" class="pin-file-button">
                Прикрепить файл
            </ui-button>
        </ui-label>
        <div class="create-student-button-wrapper">
            <ui-button>
                Создать школу
            </ui-button>
        </div>
        <ui-table :data="data" showButtons />
    </div>
</template>
<script lang="ts" setup>
const data =
    [
        ["Название"],
        [""],
        [""]
    ]
</script>
<style lang="less" scoped>
.create-school {
    .create-student-button-wrapper {
        display: flex;
        margin: 16px 0 24px;
        justify-content: flex-end;
    }
    .pin-file-button {
        margin-left: auto;
    }
}
</style>