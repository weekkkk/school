import type { IUser } from '../../interfaces';
/**
 * * Ответа запроса на авторизацию
 */
export interface IAuthResponse {
  /**
   * * Токен доступа
   */
  accessToken: string;
  /**
   * * Токен для обнолвения токена доступа
   */
  refreshToken: string;
  /**
   * * Пользователь
   */
  user: IUser;
}
