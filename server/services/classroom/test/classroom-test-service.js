const { ClassroomTest } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');
const { answerClassroomTestService } = require('../../answer');

class ClassroomTestService {
  async create(classroomId, testId) {
    const classroomTestCondidate = await ClassroomTest.findOne({
      where: {
        classroomId,
        testId,
      },
    });
    if (classroomTestCondidate) {
      throw ApiError.BadRequest(
        `Класс с id ${classroomId} уже обладает тестом ${testId}`
      );
    }

    const classroomTest = await ClassroomTest.create({ classroomId, testId });

    return classroomTest;
  }

  async deleteClassroom(classrooId) {
    const classroomTest = await ClassroomTest.findOne({
      where: { classrooId },
    });
    if (!classroomTest) {
      throw ApiError.BadRequest(`Класс с id ${classrooId} не найден`);
    }

    await ClassroomTest.destroy({ where: { classrooId } });
  }

  async deleteTest(testId) {
    const classroomTest = await ClassroomTest.findOne({ where: { testId } });
    if (!classroomTest) {
      throw ApiError.BadRequest(`Тест с id ${testId} не найден`);
    }

    try {
      await answerClassroomTestService.deleteClassroomTest(classroomTest.id);
    } catch (e) {
      console.log(e);
    }

    await ClassroomTest.destroy({ where: { classrooId } });
  }
}

module.exports = new ClassroomTestService();
