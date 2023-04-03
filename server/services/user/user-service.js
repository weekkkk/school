const { User, UserRole } = require('../../models');
const ApiError = require('../../exceptions/api-error');

class UserService {
  async create(name, email, password, role) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с email ${email} уже зарегестрирован`
      );
    }

    const user = await User.create({ name, email, password, role });

    return user;
  }

  async update(id, name, password) {
    const user = await User.findByPk(id);
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с id ${id} не зарегистрирован`);
    }

    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }

    await user.save();

    return user;
  }

  async delete(id) {
    const user = User.findByPk(id);
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с id ${id} не зарегистрирован`);
    }

    await User.destroy({ where: { id } });
  }

  async getById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с id ${id} не зарегистрирована`);
    }

    return user;
  }
}

module.exports = new UserService();
