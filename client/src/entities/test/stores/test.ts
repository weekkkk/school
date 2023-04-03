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
      tests.value?.push(response.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * * Получить все
   */
  async function getTests() {
    try {
      const response = await TestService.getTests();
      console.log(response);
      tests.value = response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * * Найти по id
   */
  function findById(id: number) {
    return tests.value?.find((test) => test.id == id);
  }

  return {
    tests: readonly(tests),
    create,
    getTests,
    findById,
  };
});
