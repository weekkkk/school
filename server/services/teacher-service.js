const TeacherDto = require('../dtos/teacher-dto');
const ApiError = require('../exceptions/api-error');
const { Teacher, SchoolTeacher } = require('../models');
const roleService = require('./role-service');
const userService = require('./user-service');
/**
 * * Сервис пользователя
 */
class TeacherService {
  /**
   * * Создание
   */
  async create(name, email, password, schoolId) {
    // роль
    const role = await roleService.getByName('TEACHER');

    if (!role) throw new ApiError('Добавьте в базу роль TEACHER');

    // создал пользователя
    const user = await userService.create(name, email, password, role);

    // создал роль пользователя
    const { userId } = await roleService.createUserRole(user.id, role.id);

    // создал учителя
    const teacher = await Teacher.create({ userId });

    // создал учителя школы
    const schoolTeacher = await SchoolTeacher.create({
      teacherId: teacher.id,
      schoolId,
    });

    const teacherData = new TeacherDto(teacher, user, role);

    return teacherData;
  }

  /**
   * * Удаление
   */
  async remove(id) {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Школа с id ${id} не найдена`);
    }

    // удалил учителя школы
    await SchoolTeacher.destroy({ where: { teacherId: id } });

    // удалил школу
    await Teacher.destroy({ where: { id } });

    // удалил пользователя
    await userService.remove(teacher.userId);
  }

  /**
   * * Изменение
   */
  async edit(id, name, password) {
    // учитель
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Школа с id ${id} не найдена`);
    }

    // пользователь
    const user = await userService.edit(teacher.userId, name, password);

    // роль
    const role = await roleService.getByName('TEACHER');

    const teacherData = new TeacherDto(teacher, user, role);

    return teacherData;
  }

  /**
   * * Получить все
   */
  async getAll() {
    // роль учителя
    const role = await roleService.getByName('TEACHER');

    // получил учителей
    const teachers = await Teacher.findAll();

    const teachersData = [];
    for (let teacher of teachers) {
      const user = await userService.getById(teacher.userId);
      if (!teacher.userId) continue;
      const teacherData = new TeacherDto(teacher, user, role);
      teachersData.push(teacherData);
    }

    return teachersData;
  }

  /**
   * * Получить все по id школы
   */
  async getAllBySchoolId(schoolId) {
    // роль учителя
    const role = await roleService.getByName('TEACHER');

    // получил учителей школы
    const schoolTeachers = await SchoolTeacher.findAll({ where: { schoolId } });

    const teachersData = [];
    for (let schoolTeacher of schoolTeachers) {
      const teacher = await Teacher.findByPk(schoolTeacher.teacherId);
      const user = await userService.getById(teacher.userId);
      const teacherData = new TeacherDto(teacher, user, role);
      teachersData.push(teacherData);
    }

    return teachersData;
  }

  /**
   * * Получить по id
   */
  async getById(id) {
    // роль школы
    const role = await roleService.getByName('TEACHER');

    // получил школу
    const teacher = await Teacher.findByPk(id);

    const user = await userService.getById(teacher.userId);

    const teacherData = new TeacherDto(teacher, user, role);

    return teacherData;
  }
}

module.exports = new TeacherService();
