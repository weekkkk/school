import axios from 'axios';
/**
 * * Ссылка на api
 */
const API_URL = 'http://localhost:4000/api/result';

/**
 * * Объект api
 */
const $result = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export { $result };
