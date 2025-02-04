'use client';

import React, { FC, useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import { Typography } from '@/shared/typography';

import { ICalendar } from './Calendar.types';

export const Calendar: FC<ICalendar> = React.memo(({ month, year }) => {
  Calendar.displayName = 'Calendar';
  const dayOfThWeek: { [key: number]: string } = {
    0: 'ПН',
    1: 'ВТ',
    2: 'СР',
    3: 'ЧТ',
    4: 'ПТ',
    5: 'СБ',
    6: 'ВС',
  };
  const [isClient, setIsClient] = useState(false);
  const [calendar, setCalendar] = useState<Date[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const dateArr: Date[] = [];
    const lastDayOfTheMonth = new Date(year, month + 1, 0);

    for (
      let i = 1;
      lastDayOfTheMonth.getTime() >= new Date(year, month, i).getTime();
      i++
    ) {
      dateArr.push(new Date(year, month, i));
    }

    if (dateArr[0].getDay() != 0) {
      for (let k = dateArr[0].getDay() - 1, i = 0; k > 0; k--, i--) {
        dateArr.unshift(new Date(year, month, i));
      }
    } else {
      for (let k = 6, i = 0; k > 0; k--, i--) {
        dateArr.unshift(new Date(year, month, i));
      }
    }

    if (lastDayOfTheMonth.getDay() !== 0) {
      for (let j = 1; j <= 7 - lastDayOfTheMonth.getDay(); j++) {
        dateArr.push(new Date(year, month, lastDayOfTheMonth.getDate() + j));
      }
    }

    setCalendar(dateArr);
  }, [year, month]);

  return (
    isClient && (
      <div className='grid grid-cols-7'>
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div
              className={`border border-grey-600 p-3 ${i % 7 !== 0 && 'border-l-0'}`}
              key={nanoid()}
            >
              <Typography className='text-grey-400'>{dayOfThWeek[i]}</Typography>
            </div>
          ))}
        {calendar.map((date, num) => (
          <div
            className={`border border-t-0 border-grey-600 bg-blue-100 p-3 ${num % 7 !== 0 && 'border-l-0'}`}
            key={nanoid()}
          >
            <div className='mb-10 flex justify-between md:mb-20'>
              <Typography variant='l-bold'> {date.getDate()}</Typography>
              <span className='badge-type-room bg-blue-600 text-white'>
                Акционный тур
              </span>
            </div>
            <div className='flex flex-wrap gap-1'>
              <span className='badge-type-room bg-white'>Комфорт</span>
              <span className='badge-type-room bg-white'>Люкс</span>
              <span className='badge-type-room bg-white'>Стандарт</span>
            </div>
          </div>
        ))}
      </div>
    )
  );
});
