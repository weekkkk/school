const { Subject, UserSubject, TeacherSubject } = require('../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

/**
 * * Сервис роли
 */
class SubjectService {
  /**
   * * Создание предмета
   */
  async create(name) {
    const candidate = await Subject.findOne({ where: { name } });
    if (candidate) {
      throw ApiError.BadRequest(`Роль с name ${email} уже сущестует`);
    }

    const subject = await Subject.create({ name });

    return subject;
  }

  /**
   * * Удалить предмет
   */
  async remove(id) {
    const subject = await Subject.findByPk(id);

    if (!subject) {
      throw ApiError.BadRequest(`Роль с id ${user} не найдена`);
    }

    // удаление роли
    await Subject.destroy({
      where: { id },
    });
  }

  /**
   * * Получить все предметы
   */
  async getAll() {
    const subjects = await Subject.findAll();

    return subjects;
  }

  /**
   * * Добавить предмет учителю
   */
  async createTeacherSubject(teacherId, subjectId) {
    const teacherSubjectData = await TeacherSubject.findOne({
      where: { teacherId },
    });

    if (teacherSubjectData) {
      throw ApiError.BadRequest(`Предмет учителя ${userId} уже создан`);
    }

    const teacherSubject = await TeacherSubject.create({
      teacherId,
      subjectId,
    });

    return teacherSubject;
  }

  /**
   * * Получить предмет учителя
   */
  async getTeacherSubject(teacherId) {
    const teacherSubject = await TeacherSubject.findOne({
      where: { teacherId },
    });

    if (!teacherSubject) {
      throw ApiError.BadRequest(`Предмет учителя ${userId} еще не создан`);
    }

    return teacherSubject;
  }

  /**
   * * Удалить предмет учителя
   */
  async removeTeacherSubject(teacherId) {
    const teacherSubject = await TeacherSubject.findOne({
      where: { teacherId },
    });

    if (!teacherSubject) {
      throw ApiError.BadRequest(`Предмет учителя ${userId} еще не создан`);
    }

    await TeacherSubject.destroy({
      where: { teacherId },
    });
  }
}

module.exports = new SubjectService();
