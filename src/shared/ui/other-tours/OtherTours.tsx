import React from 'react';

import { Typography } from '@/shared/ui/typography';

import { IOtherTours } from './OtherTours.types';
import { Select } from '../select';

export function OtherTours({ hotel, tours }: IOtherTours) {
  const eat = ['Питание'];
  const tour_operators = ['Туроператоры'];
  const add_variants = ['Все варианты'];
  return (
    <div>
      <Typography
        className={`mb-2 mr-2 flex text-xl font-semibold md:mb-8 md:text-[40px]`}
      >
        Другие туры в {hotel?.name || 'Novotel Nairobi Westlands'} (
        {tours?.length || 10} предложений)
      </Typography>
      <div className='mb-5 flex gap-5 overflow-y-scroll pb-3 lg:overflow-y-hidden'>
        <Select className='min-w-[123px] rounded-[20px] shadow-md' options={eat} />
        <Select
          className='min-w-[162px] rounded-[20px] shadow-md'
          options={tour_operators}
        />
        <Select
          className='min-w-[162px] rounded-[20px] shadow-md'
          options={add_variants}
        />
      </div>
    </div>
  );
}
