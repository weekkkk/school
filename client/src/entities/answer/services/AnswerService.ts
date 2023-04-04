import { $answer } from '../api';
import type { IAnswer } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class AnswerService {
  /**
   * * Создать тест
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
}
