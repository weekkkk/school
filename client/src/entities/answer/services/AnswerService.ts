import { $answer } from '../api';
import type { IAnswer } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class AnswerService {
  /**
   * * Создать ответ
   */
  static async create(classroomTestId: number, studentId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return $answer.post<IAnswer>(
      `/student/${studentId}/classroomTest/${classroomTestId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  /**
   * * Поставить оценку
   */
  static async setGrade(id: number, grade: number) {
    return $answer.post(`/${id}`, { grade });
  }

  /**
   * * Получить ответ
   */
  static async getAnswer(anwerId: number) {
    return $answer.get<IAnswer>(`/${anwerId}`);
  }

  /**
   * * Получить ответы
   */
  static async getAnswers(teacherId: number) {
    return $answer.get<IAnswer[]>(`/teacher/${teacherId}`);
  }
}
