const { StudentAnswer } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class AnswerStudentService {
  async create(studentId, answerId) {
    const answerStudentCondidate = await StudentAnswer.findOne({ answerId });
    if (answerStudentCondidate) {
      throw ApiError.BadRequest(`Ответ с id ${answerId} уже существует`);
    }

    const answerStudent = await StudentAnswer.create({ studentId, answerId });

    return answerStudent;
  }

  async deleteStudent(studentId) {
    const answerStudent = await StudentAnswer.findOne({
      where: { studentId },
    });
    if (!answerStudent) {
      throw ApiError.BadRequest(`Ученик id ${subjectId} не создан`);
    }

    await TestSubject.destroy({
      where: { studentId },
    });
  }

  async deleteAnswer(answerId) {
    const answerStudent = await StudentAnswer.findOne({
      where: { answerId },
    });
    if (!answerStudent) {
      throw ApiError.BadRequest(`Ответ id ${answerId} не создан`);
    }

    await TestSubject.destroy({
      where: { answerId },
    });
  }
}

module.exports = new AnswerStudentService();
