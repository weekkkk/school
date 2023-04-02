const RoleDto = require('./role-dto');

/**
 * * Данные пользователя, отправляемые на клиент
 */
module.exports = class UserDto {
  /**
   * * Имя
   */
  name;
  /**
   * * Почта
   */
  email;
  /**
   * * Уникальный ключ
   */
  id;
  /**
   * * Активирован ли пользователь
   */
  isActivated;
  /**
   * * Роль пользователя
   */
  role;

  constructor(user, role) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.isActivated = user.isActivated;
    this.role = new RoleDto(role);
  }
};
