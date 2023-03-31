const { UserRole } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class UserRoleService {
  async create(userId, roleId) {
    const candidateRole = UserRole.findOne({ where: { userId } });
    if (candidateRole) {
      throw ApiError.BadRequest(
        `Пользователь с userId ${userId} уже имеет роль`
      );
    }

    const userRole = await UserRole.create({ userId, roleId });
    return userRole;
  }

  async delete(userId) {
    const role = UserRole.findOne({ where: { userId } });
    if (!role) {
      throw ApiError.BadRequest(
        `Пользователь с userId ${userId} не имеет роль`
      );
    }

    await UserRole.destroy({ userId, roleId });
  }
}

module.exports = new UserRoleService();
