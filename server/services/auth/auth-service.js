const { User } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const tokenService = require('./token/token-service');

class UserService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    console.log(user.password, password);
    const isPassEquals = user.password == password;
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
}

module.exports = new UserService();
