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
   * * Получить классы
   */
  static async getClassrooms(teacherId: number) {
    return $classroom.get<IClassroom[]>(`/teacher/${teacherId}`);
  }
}
