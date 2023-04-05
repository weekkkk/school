const AnswerDto = require('./answer-dto');
const TestDto = require('./test-dto');

module.exports = class ResultDto {
  test;
  answer;

  constructor(test, subject, answer, user, student) {
    test = new TestDto(test, subject);
    answer = new AnswerDto(answer, user, student);
  }
};
