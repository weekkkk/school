const { User } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const tokenService = require('./token/token-service');

class UserService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = user.password == password;
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const tokens = tokenService.generateTokens({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    console.log({ userData, tokenFromDb }, userData.dataValues);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userData.id);

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const tokens = tokenService.generateTokens({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
}

module.exports = new UserService();
