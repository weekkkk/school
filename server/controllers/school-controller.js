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

      const schoolData = await schoolService.create(name, email, password);

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
   * * Изменить школу
   */
  async edit(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }

      const { id } = req.params;
      const { name, password } = req.body;

      const schoolData = await schoolService.edit(id, name, password);

      return res.json(schoolData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить все школы
   */
  async getAll(req, res, next) {
    try {
      const schoolsData = await schoolService.getAll();
      return res.json(schoolsData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить школу по id
   */
  async getById(req, res, next) {
    try {
      const {id} = req.params
      const schoolData = await schoolService.getById(id);
      return res.json(schoolData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SchoolController();
