/**
 * Возвращает локализованное строковое представление цены в рублях.
 * Формат включает разделители тысяч и символ валюты "₽" или "руб", без копеек.
 *
 * @param {number} price - Числовое значение цены.
 * @param {'symbol' | 'word'} outputFormat - Формат отображения валюты:
 *   'symbol' — с символом ₽ (по умолчанию),
 *   'word' — с текстом "руб".
 * @return {string} Отформатированная строка с ценой в рублях.
 */

export function formatNumberToPriceInRub(
  price: number,
  outputFormat: 'symbol' | 'word' = 'symbol',
): string {
  if (outputFormat === 'symbol') {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  }

  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(price);

  return `${formattedNumber} руб`;
}
