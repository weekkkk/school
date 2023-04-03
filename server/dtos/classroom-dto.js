/**
 * * Данные класса, отправляемые на клиент
 */
module.exports = class ClassroomDto {
  /**
   * * Уникальный ключ
   */
  id;
  /**
   * * Название
   */
  name;

  constructor(classroom) {
    this.id = classroom.id;
    this.name = classroom.name;
  }
};
