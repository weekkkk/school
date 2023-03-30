const { User } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { roleService } = require('../role');
const { userRoleService } = require('./role');

class UserService {
  async create(name, email, password) {
    const candidate = User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с email ${email} уже зарегестрирован`
      );
    }

    const user = await User.create({ name, email, password });

    const role = await roleService.getById(roleId);

    const userRole = userRoleService.create(user.id, role.id);

    return { user, userRole };
  }
}

module.exports = new UserService();
