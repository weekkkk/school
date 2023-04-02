const { ClassroomStudent } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class ClassroomStudentService {
  async create(classroomId, studentId) {
    const classroomStudentCondidate = await ClassroomStudent.findOne({
      where: { classroomId, studentId },
    });
    if (classroomStudentCondidate) {
      throw ApiError.BadRequest(
        `Ученик с id ${studentId} уже в классе с id ${classroomId}`
      );
    }

    const classroomStudent = await ClassroomStudent.create({
      classroomId,
      studentId,
    });
    return classroomStudent;
  }

  async delete(classroomId, studentId) {
    const classroomStudent = await ClassroomStudent.findOne({
      where: { classroomId, studentId },
    });
    if (!classroomStudent) {
      throw ApiError.BadRequest(
        `Ученика с id ${studentId} нет в классе с id ${classroomId}`
      );
    }

    await ClassroomStudent.destroy({ where: { classroomId, studentId } });
  }

  async deleteClassroom(classroomId) {
    const classroomStudent = await ClassroomStudent.findOne({
      where: { classroomId },
    });
    if (!classroomStudent) {
      throw ApiError.BadRequest(`Класс с id ${classroomId} не зарегистрирован`);
    }

    await ClassroomStudent.destroy({
      where: { classroomId },
    });
  }

  async deleteStudent(studentId) {
    const classroomStudent = await ClassroomStudent.findOne({
      where: { studentId },
    });
    if (!classroomStudent) {
      throw ApiError.BadRequest(`Ученик с id ${studentId} не зарегистрирован`);
    }

    await ClassroomStudent.destroy({
      where: { studentId },
    });
  }
}

module.exports = new ClassroomStudentService();
