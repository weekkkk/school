const { Answer } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const { answerStudentService } = require('./student');
const { answerClassroomTestService } = require('./classroom-test');

class AnswerService {
  async create(file, studentId, classroomTestId) {
    const fileName = uuid.v4() + '.dosx';
    file.mv(path.resolve(__dirname, '..', '..', 'static', fileName));

    const answer = await Answer.create({ file: fileName });

    const answerStudent = await answerStudentService.create(
      studentId,
      answer.id
    );

    const answerClassroomTest = await answerClassroomTestService.create(
      classroomTestId,
      answer.id
    );

    return { answer, answerStudent, answerClassroomTest };
  }
}

module.exports = new AnswerService();
