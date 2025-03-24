'use client';
import React, { useState } from 'react';

import { FilterYear } from '@/shared/filter-year';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

export default function ApplicationsPage() {
  const [years] = useState<number[]>([2024, 2023, 2022]);
  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <Typography variant={'h4'} className={'mb-5 mt-5'}>
          Заявки
        </Typography>
        <div className='mb-8 flex w-full flex-col-reverse gap-5 lg:flex-row lg:justify-between lg:gap-0'>
          <FilterYear yearsArr={years}></FilterYear>
          <form
            action=''
            className='flex w-full rounded-lg border border-grey-100 p-2 lg:w-1/2'
          >
            <SvgSprite name='search' width={24} />
            <input
              type='text'
              className='w-full outline-none'
              placeholder='Введите номер телефона, номер заявки или страну'
            />
          </form>
        </div>
        <Typography variant={'h4'}>20 ноября, среда</Typography>
      </div>
    </div>
  );
}
