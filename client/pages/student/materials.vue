<template>
    <div class="materials-wrapper">
        <div class="material" v-for="(material, index) in materials"
            :class="{ 'border-bottom': index == material.length - 1 }">
            <div class="material-row">
                <div class="material-name">
                    <!-- ?material.Name -->
                    1
                </div>
                <div class="material-description">
                    <ui-text text="Описание материала" />
                </div>
            </div>
            <div class="material-row">
                <div class="mark-text">
                    Файл
                </div>
                <div class="mark-input">
                    <ui-button thema="gray" class="pin-file-button">
                        Скачать файл
                    </ui-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const materials = ref([])
</script>
<style lang="less" scoped>
.materials-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: var(--color-gray-dark);
    gap: 16px;

    .material {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-top: 1px solid var(--color-gray-light);
        padding: 16px 0;
        gap: 16px;

        &.border-bottom {
            border-top: 1px solid var(--color-gray-light);
        }

        .material-row {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .material-name {
                font-weight: 600;
            }

            .material-description {
                width: 100%;
                max-width: 624px;
            }
        }
    }
}
</style>