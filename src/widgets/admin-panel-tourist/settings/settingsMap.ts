export const CURRENCIES = [
  { label: '₽', value: 'RUB' },
  { label: '$', value: 'USD' },
  { label: '€', value: 'EUR' },
] as const;

export const LANGUAGES = [
  { label: 'RU', value: 'RU' },
  { label: 'EN', value: 'EN' },
] as const;

export const CONNECTIONS = [
  { label: 'Телефон', value: 'phone' },
  { label: 'Почта', value: 'email' },
] as const;

export function mapUiToApiValueFromList(
  list: readonly { label: string; value: string }[],
  label: string,
): string {
  return list.find((item) => item.label === label)?.value ?? label;
}

export function mapApiToUiValueFromList(
  list: readonly { label: string; value: string }[],
  value: string,
): string {
  return list.find((item) => item.value === value)?.label ?? value;
}
