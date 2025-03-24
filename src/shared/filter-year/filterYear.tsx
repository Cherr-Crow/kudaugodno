'use client';
import React from 'react';

import { Typography } from '@/shared/typography';

import { IFilterYear } from './filterYear.types';

export function FilterYear({ yearsArr }: IFilterYear) {
  return (
    <div className='mb-5 flex justify-start gap-3 align-middle lg:mb-0'>
      {yearsArr.map((year: number) => {
        return (
          <div
            key={year}
            className='flex w-20 cursor-pointer items-center justify-center text-nowrap rounded-full bg-[#4757EA] text-white'
          >
            <Typography className={'pb-1 pl-3 pr-3 pt-1'} variant={'m'}>
              {year} г.
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
