import { $test } from '../api';
import type { IStudent, IStudentTest } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class StudentService {
  /**
   * * Создать школу
   */
  static async createSchoolStudent(
    name: string,
    email: string,
    password: string,
    schoolId: number
  ) {
    return $test.post<IStudent>(`/school/${schoolId}`, {
      name,
      email,
      password,
    });
  }

  /**
   * * Получить школы
   */
  static async getSchoolStudents(schoolId: number) {
    return $test.get<IStudent[]>(`/school/${schoolId}`);
  }

  /**
   * * Получить тесты
   */
  static async getTests(studentId: number) {
    return $test.get<IStudentTest[]>(`/${studentId}/test`);
  }
}
