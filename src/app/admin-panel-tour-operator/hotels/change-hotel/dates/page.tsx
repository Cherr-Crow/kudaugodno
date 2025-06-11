'use client';

import { useState } from 'react';

import { nanoid } from 'nanoid';

import { ButtonCustom } from '../../../../../shared/ui/button-custom';
import { SvgSprite } from '../../../../../shared/ui/svg-sprite';
import { Typography } from '../../../../../shared/ui/typography';
import { Calendar } from '../../../../../widgets/calendar';

const years = [2025, 2024, 2023];

export default function Dates() {
  const [year, setYear] = useState(years[0]);
  const [month, setMonth] = useState(new Date().getMonth());
  const months: { [key: number]: string } = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
  };
  const handleYearChange = (year: number) => {
    setYear(year);
  };

  const handleNextMonthChange = () => {
    month === 11 ? setMonth(0) : setMonth(month + 1);
  };

  const handlePrevMonthChange = () => {
    month === 0 ? setMonth(11) : setMonth(month - 1);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className=''>
      <ul className='my-6 flex gap-3'>
        {years.map((el) => (
          <li
            className={`badge-year bg-blue-300 ${el === year ? 'bg-blue-600 font-bold text-white' : 'bg-blue-300'}`}
            key={nanoid()}
            onClick={() => handleYearChange(el)}
          >
            {el}
          </li>
        ))}
      </ul>
      <div className='mb-5 flex justify-between'>
        <div className='flex min-w-36 items-center justify-between'>
          <SvgSprite
            name='arrow'
            width={24}
            className='rotate-180 cursor-pointer'
            onClick={handlePrevMonthChange}
          />
          <Typography variant='h5'>{months[month]}</Typography>
          <SvgSprite
            name='arrow'
            width={24}
            className='cursor-pointer'
            onClick={handleNextMonthChange}
          />
        </div>
        <ButtonCustom
          variant='secondary'
          size='m'
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          <Typography variant='l-bold'>Добавить даты</Typography>
        </ButtonCustom>
      </div>

      <Calendar year={year} month={month} />
    </div>
  );
}
