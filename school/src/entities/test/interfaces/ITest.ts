import type { ISubject } from '../../subject';

/**
 * * Тест
 */
export interface ITest {
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
