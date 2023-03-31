const { Teacher, SchoolTeacher } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { schoolTeacherService, schoolService } = require('../school');
const { classroomTeacherService } = require('../classroom');
const { subjectTeacherService } = require('../subject');

class TeacherService {
  async create(name, email, password, schoolId) {
    const role = 'TEACHER';

    const user = await userService.create(name, email, password, role);

    const teacher = await Teacher.create({ userId: user.id });

    const schoolTeacher = await schoolTeacherService.create(
      schoolId,
      teacher.id
    );

    return { teacher, user, schoolTeacher };
  }

  async update(id, name, password) {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Учитель с id ${id} не зарегистрирован`);
    }

    const user = await userService.update(teacher.userId, name, password);

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

  async getById(id) {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Учитель с id ${id} не зарегистрирован`);
    }

    const user = await userService.getById(teacher.userId);

    return { teacher, user };
  }

  async getSchool(schoolId) {
    const schoolTeachers = await schoolTeacherService.getAll(schoolId);

    const schoolTeachersData = [];

    for (let schoolTeacher of schoolTeachers) {
      const teacher = await this.getById(schoolTeacher.teacherId);
      const school = await schoolService.getById(schoolTeacher.schoolId);

      schoolTeachersData.push({ schoolTeacher, teacher, school });
    }

    return schoolTeachersData;
  }
}

module.exports = new TeacherService();
