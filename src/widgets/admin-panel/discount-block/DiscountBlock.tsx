'use client';

import React, { useState } from 'react';

import { nanoid } from 'nanoid';

import { Typography } from '@/shared/typography';
import { NamedInput } from '@/shared/ui/named-input';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';

import { IDiscountBlock } from './DiscountBlock.types';

export function DiscountBlock({ startData, getData }: IDiscountBlock) {
  const [name, setName] = useState<string>(startData[0] ? startData[0].name : '');
  const [size, setSize] = useState<number>(startData[0] ? startData[0].size : 0);
  const [startDate, setStartDate] = useState<string>(
    startData[0] ? startData[0].start_date : '',
  );
  const [endDate, setEndDate] = useState<string>(
    startData[0] ? startData[0].end_date : '',
  );

  const handleNameChange = (val: string) => {
    setName(val);
    getData([
      {
        name: val,
        size: size,
        start_date: startDate,
        end_date: endDate,
      },
    ]);
  };

  const handleSizeChange = (val: number) => {
    setSize(+val);
    getData([
      {
        name,
        size: val,
        start_date: startDate,
        end_date: endDate,
      },
    ]);
  };

  const handleStartDateChange = (val: string) => {
    const _val = val.replaceAll('.', '-');
    setStartDate(_val);
    getData([
      {
        name,
        size,
        start_date: _val,
        end_date: endDate,
      },
    ]);
  };

  const handleEndDateChange = (val: string) => {
    const _val = val.replaceAll('.', '-');
    setEndDate(_val);
    getData([
      {
        name,
        size,
        start_date: startDate,
        end_date: _val,
      },
    ]);
  };

  return (
    <div className=''>
      <Typography variant='l-bold'>Скидки:</Typography>
      <div key={nanoid()} className='flex gap-3'>
        <NamedInput
          name='Наименование'
          placeholder='Наименование'
          getValue={handleNameChange}
          startValue={name}
        />
        <NamedInput
          name='Процент скидки'
          placeholder='Процент скидки'
          getValue={handleSizeChange}
          startValue={size}
        />
        <InputDateForSearchBlock
          placeholder='С какого действует'
          getValue={handleStartDateChange}
          className='rounded-md border border-blue-600'
          startValue={startDate}
        />
        <InputDateForSearchBlock
          placeholder='До какого действует'
          getValue={handleEndDateChange}
          className='rounded-md border border-blue-600'
          startValue={endDate}
        />
      </div>
    </div>
  );
}
