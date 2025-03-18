'use client';
import React from 'react';

import { IFilterYear } from './filterYear.types';

export function FilterYear({ yearsArr }: IFilterYear) {
  console.log(yearsArr);
  return (
    <div className='years-container gap flex gap-3'>
      {yearsArr.map((year: number) => {
        return (
          <div key={year} className='year-item'>
            {year}
          </div>
        );
      })}
    </div>
  );
}
