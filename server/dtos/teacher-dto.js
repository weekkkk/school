const UserDto = require('./user-dto');
/**
 * * Данные учителя, отправляемые на клиент
 */
module.exports = class TeacherDto extends UserDto {
  constructor(school, user, role) {
    super(user, role);

    this.id = school.id;
  }
};
