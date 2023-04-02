const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class TeacherDto extends UserDto {
  constructor(user, teacher) {
    super(user);

    this.id = teacher.id;
  }
};
