const UserDto = require('./user-dto');
/**
 * * Данные учителя, отправляемые на клиент
 */
module.exports = class TeacherDto extends UserDto {
  constructor(teacher, user, role) {
    super(user, role);

    this.id = teacher.id;
  }
};
