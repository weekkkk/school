import { $test } from '../api';
import type { ITeacher } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class TeacherService {
  /**
   * * Создать школу
   */
  static async createSchoolTeacher(
    name: string,
    email: string,
    password: string,
    schoolId: number,
    subjectId: number
  ) {
    return $test.post<ITeacher>(`/school/${schoolId}`, {
      name,
      email,
      password,
      subjectId,
    });
  }

  /**
   * * Получить школы
   */
  static async getSchoolTeachers(schoolId: number) {
    return $test.get<ITeacher[]>(`/school/${schoolId}`);
  }
}
