/* Выводит текущую дату, опционально можно выводить 
дату в формате yyyy-mm-dd со сдвигом 
getDateNow(+5), getDateNow(-5)
*/

export const getDateNow = (daysOffset: number = 0) => {
  return new Date(Date.now() + daysOffset * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
};
