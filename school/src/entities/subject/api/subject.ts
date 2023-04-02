import axios from 'axios';
/**
 * * Ссылка на api
 */
export const API_URL = 'http://localhost:4000/api/subject';

/**
 * * Объект api
 */
const $subject = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export { $subject };
