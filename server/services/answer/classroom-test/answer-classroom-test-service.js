const { ClassroomTestAnswer } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class AnswerClassroomTestService {
  async create(classroomTestId, answerId) {
    const answerClassroomTestCondidate = await ClassroomTestAnswer.findOne({
      answerId,
    });
    if (answerClassroomTestCondidate) {
      throw ApiError.BadRequest(`Ответ с id ${answerId} уже существует`);
    }

    const answerClassroomTest = await ClassroomTestAnswer.create({
      classroomTestId,
      answerId,
    });

    return answerClassroomTest;
  }

  async deleteClassroomTest(classroomTestId) {
    const answerClassroomTest = await ClassroomTestAnswer.findOne({
      where: { classroomTestId },
    });
    if (!answerClassroomTest) {
      throw ApiError.BadRequest(`Тест класса id ${classroomTestId} не создан`);
    }

    await ClassroomTestAnswer.destroy({
      where: { classroomTestId },
    });
  }

  async deleteAnswer(answerId) {
    const answerClassroomTest = await ClassroomTestAnswer.findOne({
      where: { answerId },
    });
    if (!answerClassroomTest) {
      throw ApiError.BadRequest(`Ответ id ${answerId} не создан`);
    }

    await ClassroomTestAnswer.destroy({
      where: { answerId },
    });
  }
}

module.exports = new AnswerClassroomTestService();
