const schoolService = require('../services/school-service');
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
      const schoolData = await schoolService.create(name, email, password);

      res.cookie('refreshToken', schoolData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

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
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить одну школу
   */
  async getSchool(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить все школы
   */
  async getSchools(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SchoolController();
