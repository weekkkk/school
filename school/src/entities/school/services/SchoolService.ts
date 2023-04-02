import { $test } from '../api';
import type { ISchool } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class SchoolService {
  /**
   * * Создать школу
   */
  static async create(name: string, email: string, password: string) {
    return $test.post<ISchool>(`/`, { name, email, password });
  }

  /**
   * * Получить школы
   */
  static async getSchools() {
    return $test.get<ISchool[]>(`/`);
  }
}
