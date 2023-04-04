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
   * * Предметы
   */
  const answers = ref<IAnswer[]>();

  /**
   * * Создать
   */
  async function create(classroomTestId: number, file: File) {
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

  return {
    answers: readonly(answers),
    create,
  };
});
