/* 
Принимает значение даты в формате year, month, day 
и возвращает в формате для отображения day.month.year
*/

export function isoToDateFormat(isoDate: string): string {
  if (!isoDate || !isoDate.includes('-')) {
    throw new Error('Неверный формат входных данных');
  }
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
}
