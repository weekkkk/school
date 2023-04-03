import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { IClassroom } from '../interfaces';
import { ClassroomService } from '../services';
import { useUserStore } from '../../user';

/**
 * * Стор для работы с предметами
 */
export const useClassroomStore = defineStore('classroom', () => {
  /**
   * * Предметы
   */
  const classrooms = ref<IClassroom[]>();

  /**
   * * Создать
   */
  async function create(name: string) {
    try {
      const userStore = useUserStore();
      if (!userStore.user || userStore.user.role != 'TEACHER') return;
      const response = await ClassroomService.create(name, userStore.user.id);
      console.log(response);
      classrooms.value = response.data;
    } catch (e)
    {
      console.log(e);
    }
  }

  /**
   * * Получить предметы
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
