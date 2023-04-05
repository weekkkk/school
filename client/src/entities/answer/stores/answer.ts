import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { IAnswer } from '../interfaces';
import { AnswerService } from '../services';
import { useUserStore } from '../../user';

/**
 * * Стор для работы с тестами
 */
export const useAnswerStore = defineStore('answer', () => {
  /**
   * * Ответы
   */
  const answers = ref<IAnswer[]>();
  /**
   * * Ответ
   */
  const answer = ref<IAnswer>();

  /**
   * * Создать
   */
  async function create(classroomTestId: number, file?: File) {
    try {
      const userStore = useUserStore();
      const role = userStore.user?.role;
      if (!role) return;
      if (!userStore.user || role != 'STUDENT') return;
      const response = await AnswerService.create(
        classroomTestId,
        userStore.user.id,
        file
      );
      console.log(response);
      answers.value?.push(response.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * * Получить ответ
   */
  async function getAnswer(answerId: number) {
    try {
      const response = await AnswerService.getAnswer(answerId);
      answer.value = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * * Получить ответы
   */
  async function getAnswers() {
    try {
      const userStore = useUserStore();
      const role = userStore.user?.role;
      if (!role) return;
      if (!userStore.user || role != 'TEACHER') return;
      const response = await AnswerService.getAnswers(userStore.user.id);
      answers.value = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * * Поставить оценку
   */
  async function setGrade(answerId: number, grade: number) {
    try {
      const response = await AnswerService.setGrade(answerId, grade);
      console.log(response);
      const answer = answers.value?.find((answer) => answer.id == answerId);
      if (!answer) return;
      answer.grade = grade;
    } catch (e) {
      console.log(e);
    }
  }

  return {
    answer: readonly(answer),
    answers: readonly(answers),
    create,
    getAnswers,
    getAnswer,
    setGrade,
  };
});
