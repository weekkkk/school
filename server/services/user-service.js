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
   * @param email - почта
   * @param password - пароль
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
    await mailService.sendActivationLink(
      email,
      `${process.env.API_URL}/api/authorization/activate/${activationLink}`
    );

    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
  /**
   * * Удалить пользователя
   * @param refreshToken - уникальный токен пользователя
   */
  async remove(refreshToken) {
    const { userId } = tokenService.validateRefreshToken(refreshToken);

    if (!userId) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с id ${user} не найден`);
    }

    const userData = await User.destroy({ where: { id: userId } });
    const tokenData = await tokenService.removeToken(refreshToken);
    return { userData, tokenData };
  }
  /**
   * * Активация пользователя
   * @param activationLink - ссылка активации
   */
  async activate(activationLink) {
    const user = await User.findOne({ where: activationLink });
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }
  /**
   * * Авторизация
   * @param email - почта
   * @param password - пароль
   */
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  /**
   * * Выйти из аккаута
   * @param refreshToken - токен пользователя
   */
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  /**
   * * Обновить access токен
   * @param refreshToken - refresh токен пользователя
   */
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userData.id);

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
