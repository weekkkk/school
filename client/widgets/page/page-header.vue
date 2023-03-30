<template>
    <div class="page-header">
        <div class="page-header-content">
            <div class="page-header-title">Тестирование ЕГЭ</div>
            <div class="page-header-buttons">
                <ui-header-button :route="routerName.MAIN">Главная</ui-header-button>
                <ui-header-button :route="routerName.RESULTS">Просмотр результатов</ui-header-button>
                <!-- <ui-header-button :route="routerName.MAIN">Создать тестирование</ui-header-button>
                <ui-header-button :route="routerName.MAIN">Создать школу</ui-header-button>
                <ui-header-button>Выход</ui-header-button> -->
            </div>
        </div>
        <slot />
    </div>
</template>
<script lang="ts" setup>
import * as RouterName from "../../app/router/router-names"

const routerName = RouterName;
</script>
<style lang="less">
.page-header {
    display: flex;
    justify-content: center;
    height: 64px;
    background-color: #fff;
    color: var(--color-text);

    .page-header-content {
        width: 100%;
        max-width: var(--page-width);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .page-header-title {
            font-weight: 600;
            font-size: 20px;
            cursor: default;
        }

        .page-header-buttons {
            height: 100%;
            display: flex;
        }
    }
}
</style>