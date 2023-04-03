import axios from 'axios';
/**
 * * Ссылка на api
 */
export const API_URL = 'http://localhost:4000/api/student';

/**
 * * Объект api
 */
const $test = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export { $test };
