const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class StudentDto extends UserDto {
  /**
   * * Id пользователя
   */
  userId;
  constructor(user, student) {
    super(user);

    this.id = student.id;
    this.userId = user.id;
  }
};
