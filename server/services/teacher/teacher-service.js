const { Teacher } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { roleService } = require('../role');
const { schoolTeacherService } = require('../school');
const { classroomTeacherService } = require('../classroom');
const { subjectTeacherService } = require('../subject');

class TeacherService {
  async create(name, email, password, schoolId) {
    const role = await roleService.getByName('TEACHER');

    const { user, userRole } = await userService.create(
      name,
      email,
      password,
      role.id
    );

    const teacher = Teacher.create({ userId: user.id });

    const schoolTeacher = await schoolTeacherService.create(schoolId, teacher);

    return { teacher, user, userRole, schoolTeacher };
  }

  async update(id, name, password) {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Учитель с id ${id} не зарегистрирован`);
    }

    const user = await userService.update(name, password);

    return { teacher, user };
  }

  async delete(id) {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Учитель с id ${id} не зарегистрирован`);
    }

    try {
      await subjectTeacherService.deleteTeacher(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await classroomTeacherService.deleteTeacher(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await schoolTeacherService.deleteTeacher(id);
    } catch (e) {
      console.log(e);
    }

    await Teacher.destroy({ where: { id } });

    await userService.delete(teacher.userId);
  }

  async getAll() {
    const teachers = await Teacher.findAll();

    return teachers;
  }

  async getById(id) {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Учитель с id ${id} не зарегистрирован`);
    }

    return teacher;
  }
}

module.exports = new TeacherService();
