/**
 * Возвращает локализованное строковое представление цены в рублях.
 * Формат включает разделители тысяч и символ валюты "₽", без копеек.
 *
 * @param {number} price - Числовое значение цены.
 * @return {string} Отформатированная строка с ценой в рублях.
 */

export function formatNumberToPriceInRub(price: number): string {
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);

  return formattedPrice;
}
