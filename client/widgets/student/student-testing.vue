<template>
    <div class="student-testing">
        <div class="student-testing-header">
            {{ "Предмет: " + lesson }}
        </div>
        <div class="student-testing-header">
            {{ "Вариант: " + variant }}
        </div>
        <div class="answer" v-for="(test, index) in tests" :class="{ 'border-bottom': index == tests.length - 1 }">
            <div class="answer-row">
                <div class="task-name">
                    {{ "Задание" + (index + 1) }}
                </div>
                <div class="task-answer">
                    <!-- //? test.Question -->
                </div>
            </div>
            <div class="answer-row">
                <div class="mark-text">
                    Ответ
                </div>
                <div class="mark-input">
                    <ui-textarea />
                </div>
            </div>
        </div>
        <ui-label name="Файл" borderBottom>
            <ui-button thema="gray" class="pin-file-button">
                Прикрепить файл
            </ui-button>
        </ui-label>
        <ui-button class="send-answer-button">
            Отправить
        </ui-button>
    </div>
</template>
<script lang="ts" setup>
/**Параметры компонента */
const props = defineProps({
    /**Предмет теста */
    lesson: { type: String, default: "" },
    /**Вариант теста */
    variant: { type: String, default: "" },
    /**Список тестов */
    tests: { type: Array, default: () => [] }
})
</script>
<style lang="less" scoped>
.student-testing {
    display: flex;
    flex-direction: column;
    width: 100%;

    .student-testing-header {
        font-weight: 600;
        font-size: 24px;
        color: var(--color-text);
        margin-bottom: 24px;
        margin: 0 auto 24px;
    }

    .answer {
        display: flex;
        flex-direction: column;
        padding: 16px 0;
        border-top: 1px solid var(--color-gray-light);
        gap: 16px;

        .answer-row {
            display: flex;
            font-size: 16px;
            width: 100%;
            justify-content: space-between;


            .task-name {
                font-weight: 600;
            }

            .task-name,
            .mark-text {
                color: var(--color-gray-dark);
            }

            .task-answer,
            .mark-input {
                min-width: 624px;
                max-width: 624px;
            }
        }
    }

    .send-answer-button {
        margin-top: 16px;
        margin-left: auto;
    }

    .pin-file-button {
        margin-left: auto;
    }
}
</style>