<template>
    <div class="student-answers">
        <div class="student-answers-header">
            {{ "Ответ ученика: " + name }}
        </div>
        <div class="answer" v-for="(answer, index) in answers" :class="{ 'border-bottom': index == answers.length - 1 }">
            <div class="answer-row">
                <div class="task-name">
                    {{ "Таск" }}
                </div>
                <div class="task-answer">
                    {{ "Ответ" }}
                </div>
            </div>
            <div class="answer-row">
                <div class="mark-text">
                    Оценка
                </div>
                <div class="mark-input">
                    <ui-input />
                </div>
            </div>
        </div>
        <ui-label name="Файл" borderBottom v-if="isSudent">
            <ui-button thema="gray" class="pin-file-button">
                Прикрепить файл
            </ui-button>
        </ui-label>
        <div class="answer-comment" v-else>
            <ui-label name="Комментарий">
                <ui-textarea />
            </ui-label>
        </div>
        <ui-button class="send-answer-button">
            Отправить
        </ui-button>
    </div>
</template>
<script lang="ts" setup>
/**Параметры компонента */
const props = defineProps({
    /**Имя студента */
    name: { type: String, default: "" },
    /**Список ответов */
    answers: { type: Array, default: () => [1] },
    /**Является ли пользователь учеником */
    isSudent: { type: Boolean, default: false }
})
</script>
<style lang="less" scoped>
.student-answers {
    display: flex;
    flex-direction: column;
    width: 100%;

    .student-answers-header {
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
        border-top: 1px solid var(--color-light-gray);
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
}
</style>