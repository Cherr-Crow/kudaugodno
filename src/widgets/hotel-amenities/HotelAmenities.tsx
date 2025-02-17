import React from 'react';

import { nanoid } from '@reduxjs/toolkit';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { hotels } from '@/temp/hotel-mock';

import { IHotelAmenities } from './HotelAmenities.types';

export function HotelAmenities({}: IHotelAmenities) {
  return (
    <section>
      <div className='hidden sm:block'>
        <Typography
          variant='l'
          className='font-grey-950 mb-7 block text-blue-900 md:text-[24px] md:font-normal md:text-grey-950 lg:text-[32px]'
        >
          Удобства
        </Typography>

        <ul className='mb-5 grid grid-cols-2 gap-7 lg:flex lg:justify-between'>
          {hotels[0].amenities_common.map((item) => (
            <li className='' key={nanoid()}>
              <Typography className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
                общие удобства
              </Typography>
              <div className='mb-2 flex' key={nanoid()}>
                <SvgSprite
                  name='check-mark'
                  width={16}
                  className='m-0 mr-4 cursor-pointer'
                />
                <Typography variant='s' className='font-normal md:text-base'>
                  {item}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
