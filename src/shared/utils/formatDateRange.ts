export const formatDateRange = (
  startDateStr: string,
  endDateStr: string,
): string => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return '';
  }

  const fullFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  const shortFormatter = new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
  });

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startMonthLong = fullFormatter.format(startDate).split(' ')[1];
  const endMonthLong = fullFormatter.format(endDate).split(' ')[1];

  if (startMonthLong !== endMonthLong) {
    const startMonthShort = shortFormatter.format(startDate).replace('.', '');
    const endMonthShort = shortFormatter.format(endDate).replace('.', '');

    return `${startDay} ${startMonthShort} – ${endDay} ${endMonthShort}`;
  }

  return `${startDay} – ${endDay} ${startMonthLong}`;
};
