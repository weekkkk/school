import type { IOption } from '../interfaces';

export default class Option implements IOption {
  /**
   * * Уникальный ключ
   */
  Id!: number;
  /**
   * * Текст опции
   */
  Text!: string;
  /**
   * * Иконка перед текстом
   */
  BeforeIcon?: string;
  /**
   * * Иконка после текстом
   */
  AfterIcon?: string;
  constructor(obj?: Partial<Option>) {
    if (obj) Object.assign(this, obj);
  }
}
