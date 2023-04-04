import axios from 'axios';
/**
 * * Ссылка на api
 */
export const API_URL = 'http://localhost:4000/api/answer';

/**
 * * Объект api
 */
const $answer = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export { $answer };
