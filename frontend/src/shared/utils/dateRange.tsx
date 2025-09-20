import React from 'react';

import { Typography } from '../ui/typography';

interface DateRangeProps {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  className?: string;
}

const DateRange: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  className = '',
}) => {
  if (!startDate || !endDate) return null;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start
    .toLocaleString('ru-RU', { month: 'short' })
    .replace('.', '');
  const endMonth = end.toLocaleString('ru-RU', { month: 'short' }).replace('.', '');

  if (start.getMonth() === end.getMonth()) {
    const fullMonth = end.toLocaleString('ru-RU', { month: 'long' });
    return (
      <Typography className={`${className} leading-[0.5]`}>
        {startDay}-{endDay} {fullMonth}
      </Typography>
    );
  } else {
    return (
      <Typography
        className={`${className} flex items-center leading-[0.7] md:flex-row`}
      >
        <span>
          {startDay} {startMonth}
        </span>
        <span className='mx-1 flex items-center md:mx-0 md:hidden'>
          <span>-</span>
        </span>
        <span className='hidden items-center md:flex'>
          <span>-</span>
        </span>
        <span>
          {endDay} {endMonth}
        </span>
      </Typography>
    );
  }
};

export default DateRange;
