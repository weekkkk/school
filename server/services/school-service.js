const ApiError = require('../exceptions/api-error');
const { School, SchoolTeacher, SchoolStudent } = require('../models');
const userService = require('./user-service');
/**
 * * Сервис пользователя
 */
class SchoolService {
  /**
   * * Создание школы
   */
  async create(name, email, password) {
    // создал пользователя
    const user = await userService.create(name, email, password);

    // создал школу
    const school = await School.create({ userId: user.id });

    return { user, school };
  }

  /**
   * * Удаление школы
   */
  async remove(id) {
    const school = await School.findByPk(id);

    if (!school) {
      throw ApiError.BadRequest(`Школа с id ${id} не найдена`);
    }

    // удалил школу
    await School.destroy({ where: { id } });

    // удалил пользователя
    await userService.remove(school.userId);
  }
}

module.exports = new SchoolService();
