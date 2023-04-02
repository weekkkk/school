/**
 * * Пользователь
 */
export interface IUser {
  /**
   * * Уникальный ключ пользователя
   */
  id: string;
  /**
   * * Почта
   */
  email: string;
  /**
   * * Роль
   */
  role: string;
}
