import type { ISubject } from '../../subject';

/**
 * * Тест
 */
export interface IAnswer {
  /**
   * * Уникальный ключ теста
   */
  id: number;
  /**
   * * Уникальный ключ предмета
   */
  subject: ISubject;
  /**
   * * Название теста
   */
  name: string;
  /**
   * * Файл
   */
  file: string;
}
