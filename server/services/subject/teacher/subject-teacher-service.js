const { TeacherSubject } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class SubjectTeacherService {
  async create(subjectId, teacherId) {
    const subjectTeacherCondidate = await TeacherSubject.findOne({
      where: { subjectId },
    });
    if (subjectTeacherCondidate) {
      throw ApiError.BadRequest(
        `Класс с id ${subjectId} уже обладает учителем`
      );
    }

    const subjectTeacher = await TeacherSubject.create({
      subjectId,
      teacherId,
    });
    return subjectTeacher;
  }

  async deleteSubject(subjectId) {
    const subjectTeacher = await TeacherSubject.findOne({
      where: { subjectId },
    });
    if (!subjectTeacher) {
      throw ApiError.BadRequest(`Класс с id ${subjectId} не зарегистрирован`);
    }

    await TeacherSubject.destroy({
      where: { subjectId },
    });
  }

  async deleteTeacher(teacherId) {
    const subjectTeacher = await TeacherSubject.findOne({
      where: { teacherId },
    });
    if (!subjectTeacher) {
      throw ApiError.BadRequest(`Учитель с id ${teacherId} не зарегистрирован`);
    }

    await TeacherSubject.destroy({
      where: { teacherId },
    });
  }
}

module.exports = new SubjectTeacherService();
