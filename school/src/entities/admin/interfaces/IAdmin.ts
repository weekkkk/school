import type { IUser } from '../../user';
/**
 * * Админ
 */
export interface IAdmin extends IUser {
  /**
   * * Уникальный ключ пользователя
   */
  userId: number;
}
