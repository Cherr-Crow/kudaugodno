// Функция принимает дату заезда в формате 'YYYY-MM-DD' и количество ночей в виде строки

export function getCheckOutDate(checkInDate: string, nights: string) {
  const date = new Date(checkInDate); // создаем копию даты
  date.setDate(date.getDate() + Number(nights)); // прибавляем количество ночей
  return date.toISOString().split('T')[0]; // возвращаем в формате 'YYYY-MM-DD'
}
