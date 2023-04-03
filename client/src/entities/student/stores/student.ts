import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { IStudent } from '../interfaces';
import type { ITeacher } from '../../teacher/interfaces';
import { StudentService } from '../services';
import { useUserStore } from '@/entities/user';

/**
 * * Стор для работы с тестами
 */
export const useStudentStore = defineStore('student', () => {
  /**
   * * Предметы
   */
  const students = ref<IStudent[]>();

  /**
   * * Создать
   */
  async function createSchoolStudent(
    name: string,
    email: string,
    password: string
  ) {
    try {
      const userStore = useUserStore();
      if (!userStore.user || userStore.user.role != 'SCHOOL') return;
      const response = await StudentService.createSchoolStudent(
        name,
        email,
        password,
        userStore.user.id
      );
      console.log(response);
      students.value?.push(response.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * * Получить все
   */
  async function getSchoolStudents() {
    try {
      const userStore = useUserStore();
      const role = userStore.user.role;
      if (!userStore.user || (role != 'SCHOOL' && role != 'TEACHER')) return;
      const response = await StudentService.getSchoolStudents(
        role == 'SCHOOL'
          ? userStore.user.id
          : (userStore.user as ITeacher).schoolId
      );
      console.log(response);
      students.value = response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  return {
    students: readonly(students),
    createSchoolStudent,
    getSchoolStudents,
  };
});
