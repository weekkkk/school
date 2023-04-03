import type { ITest } from '../../test';

/**
 * * Прдемет
 */
export interface IClassroom {
  /**
   * * Уникальный ключ
   */
  id: number;
  /**
   * * Название
   */
  name: string;
  /**
   * * тесты
   */
  testIds: number[];
}
