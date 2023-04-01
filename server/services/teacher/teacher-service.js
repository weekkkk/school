const { Teacher } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { schoolTeacherService, schoolService } = require('../school');
const classroomTeacherService = require('../classroom/teacher/classroom-teacher-service');
const { subjectTeacherService } = require('../subject');

class TeacherService {
  async create(name, email, password, schoolId, subjectId) {
    const role = 'TEACHER';

    const user = await userService.create(name, email, password, role);

    const teacher = await Teacher.create({ userId: user.id });

    const schoolTeacher = await schoolTeacherService.create(
      schoolId,
      teacher.id
    );

    const subjectTeacher = await subjectTeacherService.create(
      subjectId,
      teacher.id
    );

    return { teacher, user, schoolTeacher, subjectTeacher };
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

  async getById(id) {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw ApiError.BadRequest(`Учитель с id ${id} не зарегистрирован`);
    }

    const user = await userService.getById(teacher.userId);

    return { teacher, user };
  }
}

module.exports = new TeacherService();
