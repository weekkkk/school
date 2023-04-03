const SubjectDto = require('./subject-dto');
const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class TeacherDto extends UserDto {
  /**
   * * Уникальный ключ пользователя
   */
  userId;
  /**
   * * Уникальный ключ предмета
   */
  subject;

  constructor(user, teacher, subject) {
    super(user);

    this.id = teacher.id;
    this.userId = user.id;
    this.subject = new SubjectDto(subject);
  }
};
