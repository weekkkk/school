import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { IClassroom } from '../interfaces';
import { ClassroomService } from '../services';
import { useUserStore } from '../../user';

/**
 * * Стор для работы с классами
 */
export const useClassroomStore = defineStore('classroom', () => {
  /**
   * * Классы
   */
  const classrooms = ref<IClassroom[]>();
  /**
   * * Создать
   */
  async function create(name: string, studentIds: number[], testIds: number[]) {
    try {
      const userStore = useUserStore();
      if (!userStore.user || userStore.user.role != 'TEACHER') return;
      const response = await ClassroomService.create(name, userStore.user.id);
      await ClassroomService.addStudents(response.data.id, studentIds);
      for (let testId of testIds) {
        await ClassroomService.addTest(response.data.id, testId);
      }
      const newClassroom: IClassroom = {
        id: response.data.id,
        name,
        testIds,
      };
      classrooms.value?.push(newClassroom);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * * Получить классы
   */
  async function getClassrooms() {
    try {
      const userStore = useUserStore();
      if (!userStore.user || userStore.user.role != 'TEACHER') return;
      const response = await ClassroomService.getClassrooms(userStore.user.id);
      console.log(response);
      classrooms.value = response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return {
    classrooms: readonly(classrooms),
    create,
    getClassrooms,
  };
});
