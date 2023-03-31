const { TestSubject } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class SubjectTestService {
  async create(subjectId, testId) {
    const subjectTestCondidate = await TestSubject.findOne({
      where: { subjectId },
    });
    if (subjectTestCondidate) {
      throw ApiError.BadRequest(
        `Класс с id ${subjectId} уже обладает учителем`
      );
    }

    const subjectTest = await TestSubject.create({
      subjectId,
      testId,
    });
    return subjectTest;
  }

  async deleteSubject(subjectId) {
    const subjectTest = await TestSubject.findOne({
      where: { subjectId },
    });
    if (!subjectTest) {
      throw ApiError.BadRequest(`Предмет с id ${subjectId} не создан`);
    }

    await TestSubject.destroy({
      where: { subjectId },
    });
  }

  async deleteTest(testId) {
    const subjectTest = await TestSubject.findOne({
      where: { testId },
    });
    if (!subjectTest) {
      throw ApiError.BadRequest(`Тест с id ${testId} не создан`);
    }

    await TestSubject.destroy({
      where: { testId },
    });
  }
}

module.exports = new SubjectTestService();
