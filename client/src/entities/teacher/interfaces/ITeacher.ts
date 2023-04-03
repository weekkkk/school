import type { ISubject } from '../../subject';
import type { IUser } from '../../user';
/**
 * * Админ
 */
export interface ITeacher extends IUser {
  /**
   * * Уникальный ключ пользователя
   */
  userId: number;
  /**
   * * Уникальный ключ школы
   */
  schoolId: number;
  /**
   * * Уникальный ключ предмета
   */
  subject: ISubject;
}
