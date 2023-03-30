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

    const userRole = UserRole.create({ userId, roleId });
    return userRole;
  }
}

module.exports = new UserRoleService();
