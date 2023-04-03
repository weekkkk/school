import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { ISchool } from '../interfaces';
import { SchoolService } from '../services';

/**
 * * Стор для работы с тестами
 */
export const useSchoolStore = defineStore('school', () => {
  /**
   * * Предметы
   */
  const schools = ref<ISchool[]>();

  /**
   * * Создать
   */
  async function create(name: string, email: string, password: string) {
    try {
      const response = await SchoolService.create(name, email, password);
      console.log(response);
      schools.value?.push(response.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * * Получить все
   */
  async function getSchools() {
    try {
      const response = await SchoolService.getSchools();
      console.log(response);
      schools.value = response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  return {
    schools: readonly(schools),
    create,
    getSchools,
  };
});
