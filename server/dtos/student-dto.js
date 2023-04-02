const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class StudentDto extends UserDto {
  constructor(user, student) {
    super(user);

    this.id = student.id;
  }
};
