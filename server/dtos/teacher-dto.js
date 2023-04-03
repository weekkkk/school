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
   * * Уникальный ключ школы
   */
  schoolId;
  /**
   * * Предмет
   */
  subject;

  constructor(user, teacher, subject, school) {
    super(user);

    this.id = teacher.id;
    this.userId = user.id;
    this.subject = new SubjectDto(subject);
    this.schoolId = school.id
  }
};
