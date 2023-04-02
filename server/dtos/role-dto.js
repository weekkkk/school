/**
 * * Данные роли, отправляемые на клиент
 */
module.exports = class RoleDto {
  /**
   * * Название
   */
  name;
  /**
   * * Уникальный ключ
   */
  id;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
  }
};
