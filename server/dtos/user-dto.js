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
   * * Роль пользователя
   */
  role;

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
};
