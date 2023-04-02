/**
 * * Опция
 */
export default interface IOption {
  /**
   * * Уникальный ключ
   */
  Id: number;
  /**
   * * Текст опции
   */
  Text: string;
  /**
   * * Иконка перед текстом
   */
  BeforeIcon?: string;
  /**
   * * Иконка после текстом
   */
  AfterIcon?: string;
}
