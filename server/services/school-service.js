const SchoolDto = require('../dtos/school-dto');
const ApiError = require('../exceptions/api-error');
const { School, SchoolTeacher, SchoolStudent, User } = require('../models');
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
   * * Изменение школы
   */
  async edit(id, name, password) {
    // школа
    const school = await School.findByPk(id);

    if (!school) {
      throw ApiError.BadRequest(`Школа с id ${id} не найдена`);
    }

    // пользователь
    const user = await userService.edit(id, name, password);

    // роль школы
    const role = await roleService.getByName('SCHOOL');

    const schoolData = new SchoolDto(school, user, role);

    return schoolData;
  }

  /**
   * * Получить все школы
   */
  async getAll() {
    // роль школы
    const role = await roleService.getByName('SCHOOL');

    // получил школы
    const schools = await School.findAll();

    const schoolsData = [];
    for (let school of schools) {
      const user = await userService.getById(school.userId);
      const schoolData = new SchoolDto(school, user, role);
      schoolsData.push(schoolData);
    }

    return schoolsData;
  }

  /**
   * * Получить все школы
   */
  async getById(id) {
    // роль школы
    const role = await roleService.getByName('SCHOOL');

    // получил школу
    const school = await School.findByPk(id);

    const user = await userService.getById(school.userId);

    const schoolData = new SchoolDto(school, user, role);

    return schoolData;
  }
}

module.exports = new SchoolService();
