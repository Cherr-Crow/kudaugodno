// Функция расчета ночей между датами формата дд.мм.гг

export const calculateNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 1;
  const formattedCheckIn = checkIn.split('.').reverse().join('-');
  const formattedCheckOut = checkOut.split('.').reverse().join('-');
  const inDate = new Date(formattedCheckIn);
  const outDate = new Date(formattedCheckOut);
  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
    console.error('Некорректные даты:', checkIn, checkOut);
    return 1;
  }
  const diffTime = outDate.getTime() - inDate.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
};
