const { SchoolTeacher } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class SchoolTeacherService {
  async create(schoolId, teacherId) {
    const schoolTeacherCandidate = await SchoolTeacher.findOne({
      where: { teacherId },
    });
    if (schoolTeacherCandidate) {
      throw ApiError.BadRequest(`Учитель с id ${teacherId} уже имеет школу`);
    }

    const schoolTeacher = await SchoolTeacher.create({ schoolId, teacherId });

    return schoolTeacher;
  }

  async deleteTeacher(teacherId) {
    const schoolTeacher = await SchoolTeacher.findOne({ teacherId });
    if (!schoolTeacher) {
      throw ApiError.BadRequest(`Учитель с id ${teacherId} не имеет учителей`);
    }

    await SchoolTeacher.destroy({ where: { teacherId } });
  }

  async deleteSchool(schoolId) {
    const schoolTeacher = await SchoolTeacher.findOne({ schoolId });
    if (!schoolTeacher) {
      throw ApiError.BadRequest(`Школа с id ${schoolId} не имеет учителей`);
    }

    await SchoolTeacher.destroy({ where: { schoolId } });
  }

  async getAll(schoolId) {
    const schoolTeachers = await SchoolTeacher.findAll({ where: { schoolId } });

    return schoolTeachers;
  }
}

module.exports = new SchoolTeacherService();
