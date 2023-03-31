const { Role } = require('../../models');
const ApiError = require('../../exceptions/api-error');

class RoleService {
  async getById(id) {
    const role = await Role.findByPk(id);
    if (!role) {
      throw ApiError.BadRequest(`Роли с id ${id} не существует`);
    }
    return role;
  }
  async getByName(name) {
    const role = await Role.findByPk(name);
    if (!role) {
      throw ApiError.BadRequest(`Роли с name ${name} не существует`);
    }
    return role;
  }
}

module.exports = new RoleService();
