import type { IUser } from '../../user';
/**
 * * Админ
 */
export interface ISchool extends IUser {
  /**
   * * Уникальный ключ пользователя
   */
  userId: number;
}
