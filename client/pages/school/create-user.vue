<template>
    <div class="create-user">
        <ui-label name="ФИО">
            <ui-input />
        </ui-label>
        <ui-label name="Email">
            <ui-input />
        </ui-label>
        <ui-label  name="Пароль" borderBottom>
            <ui-input />
        </ui-label>
        <div class="create-student-button-wrapper">
            <ui-button>
                Создать ученика
            </ui-button>
        </div>
        <ui-table :data="data" showEditButtons />
    </div>
</template>
<script lang="ts" setup>
const data =
    [
        ["Роль", "ФИО", "Email", "Предмет", "Пароль"],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ]
</script>
<style lang="less" scoped>
.create-user {
    .create-student-button-wrapper {
        display: flex;
        margin: 16px 0 24px;
        justify-content: flex-end;
    }
}
</style>