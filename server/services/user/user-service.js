const { User, UserRole } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { roleService } = require('../role');
const { userRoleService } = require('./role');

class UserService {
  async create(name, email, password, roleId) {
    const candidate = User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с email ${email} уже зарегестрирован`
      );
    }

    const user = await User.create({ name, email, password });

    const role = await roleService.getById(roleId);

    const userRole = await userRoleService.create(user.id, role.id);

    return { user, userRole };
  }

  async update(id, name, password) {
    const user = User.findByPk(id);
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

    await userRoleService.delete(id);

    await User.destroy({ where: { id } });
  }
}

module.exports = new UserService();
