const SubjectDto = require('./subject-dto');

/**
 * * Данные пользователя, отправляемые на клиент
 */
module.exports = class TestDto {
  /**
   * * Имя
   */
  name;
  /**
   * * Файл
   */
  file;
  /**
   * * Уникальный ключ
   */
  id;
  /**
   * * Уникальный ключ предмета
   */
  subject;

  constructor(test, subject) {
    this.id = test.id;
    this.name = test.name;
    this.file = `http://localhost:${process.env.PORT}/${test.file}`;
    this.subject = new SubjectDto(subject);
  }
};
