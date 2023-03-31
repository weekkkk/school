const { SchoolStudent } = require('../../../models');
const ApiError = require('../../exceptions/api-error');

class SchoolStudentService {
  async create(schoolId, studentId) {
    const schoolStudentCandidate = await SchoolStudent.findOne({ studentId });
    if (schoolStudentCandidate) {
      throw ApiError.BadRequest(`Учитель с id ${studentId} уже имеет школу`);
    }

    const schoolStudent = await SchoolStudent.create({ schoolId, studentId });

    return schoolStudent;
  }

  async deleteStudent(studentId) {
    const schoolStudent = await SchoolStudent.findOne({ studentId });
    if (!schoolStudent) {
      throw ApiError.BadRequest(`Ученик с id ${studentId} не имеет школы`);
    }

    await SchoolStudent.destroy({ where: { studentId } });
  }
  
  async deleteSchool(schoolId) {
    const schoolStudent = await SchoolStudent.findOne({ schoolId });
    if (!schoolStudent) {
      throw ApiError.BadRequest(`Школа с id ${schoolId} не имеет учеников`);
    }

    await SchoolStudent.destroy({ where: { schoolId } });
  }
}

module.exports = new SchoolStudentService();
