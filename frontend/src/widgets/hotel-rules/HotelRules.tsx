import React from 'react';

import { nanoid } from 'nanoid';

import { Typography } from '@/shared/ui/typography';

import { IHotelRules } from './HotelRules.types';

export function HotelRules({ rules }: IHotelRules) {
  return (
    <section>
      <div className='mb-5 rounded-2xl p-4 shadow-md sm:shadow-none'>
        <Typography
          variant='s'
          className='mb-7 block text-base font-semibold md:text-[24px] md:font-normal lg:text-[32px]'
        >
          Правила
        </Typography>

        <ul className=''>
          {rules.rules.map((item) => (
            <li
              className='mb-3 flex items-start gap-3 lg:items-center'
              key={nanoid()}
            >
              <div className='h-1 w-1 pt-[10px] lg:pt-[0px]'>
                <div className='h-1 w-1 rounded-full bg-blue-bold'></div>
              </div>

              <Typography className='block font-normal text-blue-900'>
                {item.name}
                {'.'} {item.description}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
