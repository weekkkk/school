const { SubjectStudent } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class SubjectStudentService {
  async create(subjectId, studentId) {
    const subjectStudentCondidate = await SubjectStudent.findOne({
      where: { subjectId, studentId },
    });
    if (subjectStudentCondidate) {
      throw ApiError.BadRequest(
        `Ученик с id ${studentId} уже в классе с id ${subjectId}`
      );
    }

    const subjectStudent = await SubjectStudent.create({
      subjectId,
      studentId,
    });
    return subjectStudent;
  }

  async deleteSubject(subjectId) {
    const subjectStudent = await SubjectStudent.findOne({
      where: { subjectId },
    });
    if (!subjectStudent) {
      throw ApiError.BadRequest(`Класс с id ${subjectId} не зарегистрирован`);
    }

    await SubjectStudent.destroy({
      where: { subjectId },
    });
  }

  async deleteStudent(studentId) {
    const subjectStudent = await SubjectStudent.findOne({
      where: { studentId },
    });
    if (!subjectStudent) {
      throw ApiError.BadRequest(`Ученик с id ${studentId} не зарегистрирован`);
    }

    await SubjectStudent.destroy({
      where: { studentId },
    });
  }
}

module.exports = new SubjectStudentService();
