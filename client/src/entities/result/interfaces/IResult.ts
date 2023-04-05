import type { IAnswer } from '@/entities/answer';
import type { ITest } from '@/entities/test';

/**
 * * Результат
 */
export interface IResult {
  /**
   * * Тест
   */
  test: ITest;
  /**
   * * Ответ
   */
  answer: IAnswer;
}
