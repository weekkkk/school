import type { IAdmin } from '../../../admin';
import type { ISchool } from '../../../school';
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
  user: IAdmin | ISchool;
}
