const { Role } = require('../../models');
const ApiError = require('../../exceptions/api-error');

class RoleService {
  async getById(id) {
    const role = Role.findByPk(id);
    if (!role) {
      throw ApiError.BadRequest(`Роли с id ${id} не существует`);
    }
    return role;
  }
}

module.exports = new RoleService();
