import axios from 'axios';
/**
 * * Ссылка на api
 */
export const API_URL = 'http://localhost:4000/api/classroom';

/**
 * * Объект api
 */
const $classroom = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export { $classroom };
