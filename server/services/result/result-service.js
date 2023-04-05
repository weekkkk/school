const {
  Classroom,
  ClassroomTest,
  SchoolStudent,
  StudentAnswer,
  ClassroomTestAnswer,
  Test,
  TestSubject,
  Subject,
} = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { ResultDto, TestDto } = require('../../dtos');
const { answerService } = require('../answer');

class ResultService {
  async getAll(schoolId, subjectId) {
    const arr = [];
    const schoolStudents = await SchoolStudent.findAll({ where: { schoolId } });
    for (let schoolStudent of schoolStudents) {
      const studentAnswers = await StudentAnswer.findAll({
        where: { studentId: schoolStudent.studentId },
      });
      for (let studentAnswer of studentAnswers) {
        const answer = await answerService.getAnswer(studentAnswer.id);
        const classroomTestAnswer = await ClassroomTestAnswer.findOne({
          where: { answerId: answer.id },
        });
        const classroomTest = await ClassroomTest.findByPk(
          classroomTestAnswer.classroomTestId
        );
        const test = await Test.findByPk(classroomTest.testId);
        const testSubject = await TestSubject.findOne({
          where: { testId: test.id },
        });
        const subject = await Subject.findByPk(testSubject.subjectId);
        const testDto = new TestDto(test, subject);
        arr.push({
          test: testDto,
          answer,
        });
      }
    }
    return arr.filter((el) => el.test.subject.id == subjectId);
  }
}

module.exports = new ResultService();
