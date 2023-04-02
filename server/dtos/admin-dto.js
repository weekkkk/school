const UserDto = require('./user-dto');
/**
 * * Данные админа, отправляемые на клиент
 */
module.exports = class AdminDto extends UserDto {
  userId;

  constructor(user, admin) {
    super(user);

    this.id = admin.id;
    this.userId = user.id;
  }
};
