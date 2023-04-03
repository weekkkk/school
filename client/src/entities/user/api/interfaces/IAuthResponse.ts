import type { IStudent } from '@/entities/student';
import type { IAdmin } from '../../../admin';
import type { ISchool } from '../../../school';
import type { ITeacher } from '@/entities/teacher';
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
  user: IAdmin | ISchool | ITeacher | IStudent;
}
