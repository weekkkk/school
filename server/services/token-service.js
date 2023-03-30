const jwt = require('jsonwebtoken');

const { Token, UserToken } = require('../models');
const ApiError = require('../exceptions/api-error');

class TokenService {
  /**
   * * Генерация токенов
   * @param payload
   */
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30s',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  /**
   * * Валидация access токена
   * @param token - значение токена
   * @returns
   */
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  /**
   * * Валидация refresh токена
   * @param token - значение токена
   * @returns
   */
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  /**
   * * Сохранить токен
   * @param userId - id пользователя
   * @param refreshToken - refresh токен
   */
  async saveToken(userId, refreshToken) {
    const tokenData = await UserToken.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ refreshToken });
    const userToken = await UserToken.create({ userId });
    return { ...userToken, ...token };
  }

  /**
   * * Удалить токен
   * @param refreshToken - токен, который нужно удалить
   */
  async removeToken(userId) {
    // проверка наличия токена в базе
    const userToken = await UserToken.findOne({ where: { userId } });
    if (!userToken) {
      throw ApiError.BadRequest(`У пользователя ${userId} нет refreshToken`);
    }

    // удалил токен пользователя
    await UserToken.destroy({ where: { userId } });

    // удалил токен
    await Token.destroy({ where: { id: userToken.tokenId } });
  }

  /**
   * * Найти токен
   * @param refreshToken - токен, который нужно найти
   */
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
