import type { IStudent } from '../../student';

/**
 * * Тест
 */
export interface IAnswer {
  /**
   * * Уникальный ключ теста
   */
  id: number;
  /**
   * * Оценка
   */
  grade: number;
  /**
   * * Уникальный ключ предмета
   */
  student: IStudent;
}
