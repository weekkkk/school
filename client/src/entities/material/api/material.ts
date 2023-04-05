import axios from 'axios';
/**
 * * Ссылка на api
 */
export const API_URL = 'http://localhost:4000/api/material';

/**
 * * Объект api
 */
const $material = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export { $material };
