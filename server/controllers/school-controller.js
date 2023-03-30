const schoolService = require('../services/school-service');
const SchoolDto = require('../dtos/school-dto');

const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class SchoolController {
  /**
   * * Создать школу
   */
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }

      const { name, email, password } = req.body;

      const schoolData = await schoolService.create(
        name,
        email,
        password
      );

      return res.json(schoolData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Удалить школу
   */
  async remove(req, res, next) {
    try {
      const { id } = req.params;

      await schoolService.remove(id);

      return res.json();
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить все школы
   */
  async getAll(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SchoolController();
