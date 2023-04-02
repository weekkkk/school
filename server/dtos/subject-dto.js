/**
 * * Данные пользователя, отправляемые на клиент
 */
module.exports = class SubjectDto {
  /**
   * * Имя
   */
  name;
  /**
   * * Уникальный ключ
   */
  id;

  constructor(subject) {
    this.id = subject.id;
    this.name = subject.name;
  }
};
