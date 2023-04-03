import { EColor } from '../enums';
/**
 * * Получить название переменной цвета
 */
export default function getColorVarName(color: EColor) {
  switch (color) {
    case EColor.Base:
      return 'var(--n-base)';
    case EColor.Brand:
      return 'var(--n-brand)';
    case EColor.Danger:
      return 'var(--n-danger)';
    case EColor.Default:
      return 'var(--n-default)';
    case EColor.Second:
      return 'var(--n-second-100)';
    case EColor.Success:
      return 'var(--n-success)';
    case EColor.Warn:
      return 'var(--n-warn)';
  }
}
