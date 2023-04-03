import { readonly, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { API_URL, type IAuthResponse } from '../api';
import { AuthService } from '../services';
import type { IAdmin } from '../../admin';
import type { ISchool } from '../../school';

/**
 * * Стор для работы с пользователем
 */
const useUserStore = defineStore('user', () => {
  /**
   * * Пользователь
   */
  const user = ref<IAdmin | ISchool>();
  /**
   * * Проверялось ли авторизован пользователь или нет
   */
  const isAuthChecked = ref(false);
  /**
   * * Вход
   */
  async function login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      user.value = response.data.user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  /**
   * * Выход
   */
  async function logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      user.value = undefined;
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  }
  /**
   * * Проверка того, авторизован ли пользователь
   */
  async function checkAuth() {
    isAuthChecked.value = true;
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      user.value = response.data.user;
    } catch (e) {
      console.log(e);
    }
  }

  return {
    user: readonly(user),
    login,
    logout,
    checkAuth,
    isAuthChecked: readonly(isAuthChecked),
  };
});

export default useUserStore;
