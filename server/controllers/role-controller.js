const schoolService = require('../services/school-service');
const SchoolDto = require('../dtos/school-dto');

const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const roleService = require('../services/role-service');

class RoleController {
  /**
   * * Создать роль
   */
  async create(req, res, next) {
    try {
      const { name } = req.body;

      const role = await roleService.create(name);

      return res.json(role);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RoleController();
