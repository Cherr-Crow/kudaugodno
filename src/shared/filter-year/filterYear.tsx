'use client';
import React from 'react';

import { Typography } from '@/shared/typography';

import { IFilterYear } from './filterYear.types';

export function FilterYear({ yearsArr }: IFilterYear) {
  console.log(yearsArr);
  return (
    <div className='years-container gap flex gap-3'>
      {yearsArr.map((year: number) => {
        return (
          <div key={year} className='p- rounded-full bg-[#4757EA] text-white'>
            <Typography className={'subtle mb-1 ml-3 mr-3 mt-1'}>
              {year} г.
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
