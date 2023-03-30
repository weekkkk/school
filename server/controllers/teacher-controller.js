const teacherService = require('../services/teacher-service');
const TeacherDto = require('../dtos/teacher-dto');

const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class TeacherController {
  /**
   * * Создать
   */
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }

      const { name, email, password, schoolId } = req.body;

      const teacherData = await teacherService.create(
        name,
        email,
        password,
        schoolId
      );

      return res.json(teacherData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Удалить
   */
  async remove(req, res, next) {
    try {
      const { id } = req.params;

      await teacherService.remove(id);

      return res.json();
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Изменить
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

      const teacherData = await teacherService.edit(id, name, password);

      return res.json(teacherData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить все
   */
  async getAll(req, res, next) {
    try {
      const teachersData = await teacherService.getAll();
      return res.json(teachersData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить всех учителей школы
   */
  async getSchoolTeachers(req, res, next) {
    try {
      const { id } = req.params;
      const teachersData = await teacherService.getAllBySchoolId(id);
      return res.json(teachersData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * * Получить по id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const teacherData = await teacherService.getById(id);
      return res.json(teacherData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TeacherController();
