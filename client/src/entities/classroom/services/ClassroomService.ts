import type { ITest } from '../../test';
import { $classroom } from '../api';
import type { IClassroom } from '../interfaces';
/**
 * * Сервис классов
 */
export class ClassroomService {
  /**
   * * Создать класс
   */
  static async create(name: string, teacherId: number) {
    return $classroom.post<IClassroom>(`/teacher/${teacherId}`, { name });
  }
  /**
   * * Добавить учеников в класс
   */
  static async addStudents(id: number, studentIds: number[]) {
    $classroom.post(`/${id}/student`, { studentIds });
  }
  /**
   * * Добавить тест в класс
   */
  static async addTest(id: number, testId: number) {
    $classroom.post<ITest>(`/${id}/test/${testId}`);
  }
  /**
   * * Получить классы
   */
  static async getClassrooms(teacherId: number) {
    return $classroom.get<IClassroom[]>(`/teacher/${teacherId}`);
  }
}
