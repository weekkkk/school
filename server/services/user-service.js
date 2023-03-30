const { User } = require('../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

/**
 * * Сервис пользователя
 */
class UserService {
  /**
   * * Создание пользователя
   */
  async create(name, email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с email ${email} уже сущестует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = await uuid.v4();

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      activationLink,
    });

    return user;
  }

  /**
   * * Удалить пользователя
   */
  async remove(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с id ${user} не найден`);
    }

    // удаление пользователя
    await User.destroy({
      where: { id },
    });
  }

  /**
   * * Изменить пользователя
   */
  async edit(id, name, password) {
    const user = await User.findByPk(id);

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с id ${id} не найден`);
    }

    user.name = name;
    user.password = password;

    await user.save();

    return user;
  }

  /**
   * * Получить по id
   */
  async getById(id) {
    const user = await User.findByPk(id);
    return user;
  }
}

module.exports = new UserService();
