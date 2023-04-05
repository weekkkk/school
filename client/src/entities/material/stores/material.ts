import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { IMaterial } from '../interfaces';
import { MaterialService } from '../services';
import { useUserStore } from '@/entities/user';
import type { ITeacher } from '@/entities/teacher';

/**
 * * Стор для работы с тестами
 */
export const useMaterialStore = defineStore('material', () => {
  /**
   * * Предметы
   */
  const materials = ref<IMaterial[]>();

  /**
   * * Создать
   */
  async function create(name: string, file: File) {
    try {
      const userStore = useUserStore();
      if (!userStore.user || userStore.user.role != 'TEACHER') return;
      const response = await MaterialService.create(
        name,
        (userStore.user as ITeacher).subject.id,
        file
      );
      console.log(response);
      materials.value?.push(response.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * * Получить все
   */
  async function getMaterials() {
    try {
      const response = await MaterialService.getMaterials();
      console.log(response);
      materials.value = response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  return {
    materials: readonly(materials),
    create,
    getMaterials,
  };
});
