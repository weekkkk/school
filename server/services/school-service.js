const ApiError = require('../exceptions/api-error');
const userService = require('../services/user-service');
const { School } = require('../models');
/**
 * * Сервис пользователя
 */
class SchoolService {
  /**
   * * Создание пользователя
   * @param email - почта
   * @param password - пароль
   */
  async create(name, email, password) {
    const { accessToken, refreshToken, user } = await userService.create(
      name,
      email,
      password
    );

    const school = await School.create({ userId: user.id });

    return { accessToken, refreshToken, school };
  }
}

module.exports = new SchoolService();
