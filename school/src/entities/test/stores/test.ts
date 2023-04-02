import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { ITest } from '../interfaces';
import { TestService } from '../services';

/**
 * * Стор для работы с тестами
 */
export const useTestStore = defineStore('test', () => {
  /**
   * * Предметы
   */
  const tests = ref<ITest[]>();

  /**
   * * Создать
   */
  async function create(name: string, subjectId: number, file: File) {
    try {
      const response = await TestService.create(name, subjectId, file);
      console.log(response);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  return {
    tests: readonly(tests),
    create,
  };
});
