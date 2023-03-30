const SchoolDto = require('../dtos/school-dto');
const ApiError = require('../exceptions/api-error');
const { School, SchoolTeacher, SchoolStudent } = require('../models');
const roleService = require('./role-service');
const userService = require('./user-service');
/**
 * * Сервис пользователя
 */
class SchoolService {
  /**
   * * Создание школы
   */
  async create(name, email, password) {
    // роль школы
    const role = await roleService.getByName('SCHOOL');

    if (!role) throw new ApiError('Добавьте в базу роль SCHOOL');

    // создал пользователя
    const user = await userService.create(name, email, password, role);

    // создал роль пользователя
    const { userId } = await roleService.createUserRole(user.id, role.id);

    // создал школу
    const school = await School.create({ userId });

    const schoolData = new SchoolDto(school, user, role);

    return schoolData;
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

  /**
   * * Удаление школы
   */
  async getAll() {
    // получил школы
    const schools = await School.findAll();

    // получил gjkmpjdfntkt

    return schools;
  }
}

module.exports = new SchoolService();
