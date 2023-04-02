const { StudentAnswer, Answer } = require('../../../models');
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

  async setGrade(id, grade) {
    const answerStudent = await StudentAnswer.findByPk(id);
    if (!answerStudent) {
      throw ApiError.BadRequest(`Ответ с id ${id} не найден`);
    }

    answerStudent.grade = grade;

    return answerStudent;
  }

  async deleteStudent(studentId) {
    const answerStudent = await StudentAnswer.findOne({
      where: { studentId },
    });
    if (!answerStudent) {
      throw ApiError.BadRequest(`Ученик id ${subjectId} не создан`);
    }

    await StudentAnswer.destroy({
      where: { studentId },
    });

    await Answer.destroy({
      where: { id: answerStudent.answerId },
    });
  }

  async deleteAnswer(answerId) {
    const answerStudent = await StudentAnswer.findOne({
      where: { answerId },
    });
    if (!answerStudent) {
      throw ApiError.BadRequest(`Ответ id ${answerId} не создан`);
    }

    await StudentAnswer.destroy({
      where: { answerId },
    });
  }
}

module.exports = new AnswerStudentService();
