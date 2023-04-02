import type { AxiosResponse } from 'axios';
import { $subject } from '../api';
import type { ISubject } from '../interfaces';
/**
 * * Сервис авторизации
 */
export class SubjectService {
  /**
   * * Получить предметы
   */
  static async getSubjects() {
    return $subject.get<ISubject[]>('/');
  }
}
