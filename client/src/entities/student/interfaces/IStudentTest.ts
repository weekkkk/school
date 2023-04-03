import type { IClassroom } from '../../classroom';
import type { ITest } from '../../test';

/**
 * * Тест для ученика
 */
export interface IStudentTest {
  /**
   * * Уникальный ключ
   */
  id: number;
  /**
   * * Класс
   */
  classroom: IClassroom;
  /**
   * * Тест
   */
  test: ITest;
}
