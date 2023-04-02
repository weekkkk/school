import { $test } from '../api';
import type { ITest } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class TestService {
  /**
   * * Создать тест
   */
  static async create(name: string, subjectId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return $test.post<ITest>(`/subject/${subjectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * * Получить тесты
   */
  static async getTests() {
    return $test.get<ITest[]>(`/`);
  }
}
