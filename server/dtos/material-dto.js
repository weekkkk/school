const SubjectDto = require('./subject-dto');

/**
 * * Данные пользователя, отправляемые на клиент
 */
module.exports = class MaterialDto {
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

  constructor(material, subject) {
    this.id = material.id;
    this.name = material.name;
    this.file = `http://localhost:${process.env.PORT}/${material.file}`;
    this.subject = new SubjectDto(subject);
  }
};
