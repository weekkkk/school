import { $material } from '../api';
import type { IMaterial } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class MaterialService {
  /**
   * * Создать тест
   */
  static async create(name: string, subjectId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return $material.post<IMaterial>(`/subject/${subjectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * * Получить тесты
   */
  static async getMaterials() {
    return $material.get<IMaterial[]>(`/`);
  }
}
