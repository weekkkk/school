const { TeacherClassroom } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class ClassroomTeacherService {
  async create(classroomId, teacherId) {
    const classroomTeacherCondidate = await TeacherClassroom.findOne({
      where: { classroomId },
    });
    if (classroomTeacherCondidate) {
      throw ApiError.BadRequest(
        `Класс с id ${classroomId} уже обладает учителем`
      );
    }

    const classroomTeacher = await TeacherClassroom.create({
      classroomId,
      teacherId,
    });
    return classroomTeacher;
  }

  async deleteClassroom(classroomId) {
    const classroomTeacher = await TeacherClassroom.findOne({
      where: { classroomId },
    });
    if (!classroomTeacher) {
      throw ApiError.BadRequest(`Класс с id ${classroomId} не зарегистрирован`);
    }

    await TeacherClassroom.destroy({
      where: { classroomId },
    });
  }

  async deleteTeacher(teacherId) {
    const classroomTeacher = await TeacherClassroom.findOne({
      where: { teacherId },
    });
    if (!classroomTeacher) {
      throw ApiError.BadRequest(`Учитель с id ${teacherId} не зарегистрирован`);
    }

    await TeacherClassroom.destroy({
      where: { teacherId },
    });
  }

  async getAll(teacherId) {
    const teacherClassrooms = await TeacherClassroom.findAll({
      where: { teacherId },
    });

    return teacherClassrooms;
  }
}

module.exports = new ClassroomTeacherService();
