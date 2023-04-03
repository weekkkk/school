import type { IUser } from '../../user';
/**
 * * Админ
 */
export interface IStudent extends IUser {
  /**
   * * Уникальный ключ пользователя
   */
  userId: number;
}
