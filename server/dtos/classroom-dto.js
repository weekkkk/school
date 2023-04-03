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
  /**
   * * Тесты 
   */
  testIds

  constructor(classroom, tests = []) {
    this.id = classroom.id;
    this.name = classroom.name;
    this.testIds = tests.map(test => test.id)
  }
};
