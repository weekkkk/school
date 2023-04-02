import type { AxiosResponse } from 'axios';
import { type IAuthResponse, $auth } from '../api';
/**
 * * Сервис авторизации
 */
export class AuthService {
  /**
   * * Вход
   */
  static login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $auth.post<IAuthResponse>('/login', { email, password });
  }
}
