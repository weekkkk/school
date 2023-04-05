const StudentDto = require('./student-dto');
/**
 * * Данные ответа, отправляемые на клиент
 */
module.exports = class AnswerDto {
  id;
  student;
  file;
  grade;

  constructor(answer, user, student, grade) {
    this.id = answer.id;
    this.student = new StudentDto(user, student);
    this.file = `http://localhost:${process.env.PORT}/${answer.file}`;
    this.grade = grade;
  }
};
