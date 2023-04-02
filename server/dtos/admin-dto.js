const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class AdminDto extends UserDto {
  constructor(school, user, role) {
    super(user, role);

    this.id = school.id;
  }
};
