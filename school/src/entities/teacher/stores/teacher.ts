import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { ITeacher } from '../interfaces';
import { TeacherService } from '../services';
import { useUserStore } from '@/entities/user';

/**
 * * Стор для работы с тестами
 */
export const useTeacherStore = defineStore('teacher', () => {
  /**
   * * Предметы
   */
  const teachers = ref<ITeacher[]>();

  /**
   * * Создать
   */
  async function createSchoolTeacher(
    name: string,
    email: string,
    password: string,
    subjectId: number
  ) {
    try {
      const userStore = useUserStore();
      if (!userStore.user || userStore.user.role != 'SCHOOL') return;
      const response = await TeacherService.createSchoolTeacher(
        name,
        email,
        password,
        userStore.user.id,
        subjectId
      );
      console.log(response);
      teachers.value?.push(response.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * * Получить все
   */
  async function getSchoolTeachers() {
    try {
      const userStore = useUserStore();
      if (!userStore.user || userStore.user.role != 'SCHOOL') return;
      const response = await TeacherService.getSchoolTeachers(
        userStore.user.id
      );
      console.log(response);
      teachers.value = response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  return {
    teachers: readonly(teachers),
    createSchoolTeacher,
    getSchoolTeachers,
  };
});
