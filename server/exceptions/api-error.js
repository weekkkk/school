/**
 * * Ошибка
 */
module.exports = class ApiError extends Error {
  /**
   * * Статус
   */
  status;
  /**
   * * Массив ошибок
   */
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизаван');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
