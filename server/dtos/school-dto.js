const UserDto = require('./user-dto');
/**
 * * Данные школы, отправляемые на клиент
 */
module.exports = class SchoolDto extends UserDto {
  constructor(school, user, role) {
    super(user, role);

    this.id = school.id;
  }
};
