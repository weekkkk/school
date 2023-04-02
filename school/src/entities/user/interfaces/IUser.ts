/**
 * * Пользователь
 */
export interface IUser {
  /**
   * * Уникальный ключ пользователя
   */
  id: number;
  /**
   * * Имя
   */
  name: string;
  /**
   * * Почта
   */
  email: string;
  /**
   * * Роль
   */
  role: string;
}
