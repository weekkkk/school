const { Role, UserRole } = require('../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

/**
 * * Сервис роли
 */
class RoleService {
  /**
   * * Создание роли
   */
  async create(name) {
    const candidate = await Role.findOne({ where: { name } });
    if (candidate) {
      throw ApiError.BadRequest(`Роль с name ${email} уже сущестует`);
    }

    const role = await Role.create({ name });

    return role;
  }

  /**
   * * Удалить роль
   */
  async remove(id) {
    const role = await Role.findByPk(id);

    if (!role) {
      throw ApiError.BadRequest(`Роль с id ${user} не найдена`);
    }

    // удаление роли
    await Role.destroy({
      where: { id },
    });
  }

  /**
   * * Получить все роли
   */
  async getAll() {
    const roles = await Role.findAll();

    return roles;
  }

  /**
   * * Получить роль по названию
   */
  async getByName(name) {
    const role = await Role.findOne({ where: { name } });

    if (!role) {
      throw ApiError.BadRequest(`Роль с name ${name} не найдена`);
    }

    return role;
  }

  /**
   * * Создать роль пользователю
   */
  async createUserRole(userId, roleId) {
    const userRoleData = await UserRole.findOne({ where: { userId, roleId } });

    if (userRoleData) {
      throw ApiError.BadRequest(
        `Роль пользователя с ${{ userId, roleId }} уже существует`
      );
    }

    const userRole = await UserRole.create({ userId, roleId });

    return userRole;
  }
}

module.exports = new RoleService();
