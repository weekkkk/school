const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class SchoolDto extends UserDto {
  constructor(user, school) {
    super(user);

    this.id = school.id;
  }
};
