import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { ISubject } from '../interfaces';
import { SubjectService } from '../services';

/**
 * * Стор для работы с предметами
 */
export const useSubjectStore = defineStore('subject', () => {
  /**
   * * Предметы
   */
  const subjects = ref<ISubject[]>();

  /**
   * * Получить предметы
   */
  async function getSubjects() {
    try {
      const response = await SubjectService.getSubjects();
      console.log(response);
      subjects.value = response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * * Найти предмет по id
   */
  function findById(id: number) {
    return subjects.value.find((subject) => subject.id == id);
  }

  return {
    subjects: readonly(subjects),
    getSubjects,
    findById,
  };
});
