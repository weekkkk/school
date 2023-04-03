const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class SchoolDto extends UserDto {
  /**
   * * Id пользователя
   */
  userId;
  constructor(user, school) {
    super(user);

    this.id = school.id;
    this.userId = user.id;
  }
};
