'use client';

import React, { useEffect, useState } from 'react';

import { Typography } from '@/shared/typography';

import { IInputDateForSearchBlock } from './InputDateForSearchBlock.types';
import { isoToDateFormat } from '../../../utils/isoToDateFormat';

export function InputDateForSearchBlock({
  placeholder,
  getValue,
  className,
  startValue,
}: IInputDateForSearchBlock) {
  const [value, setValue] = useState<string>(startValue ?? '');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoDate = e.target.value;
    setValue(isoDate);
    getValue(isoDate);
  };

  const handleClickDiv = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const inputElement = e.currentTarget.querySelector('input') as HTMLInputElement;
    if (inputElement) {
      inputElement.showPicker?.();
    }
  };

  useEffect(() => {
    if (!startValue) return;
    setValue(startValue);
  }, [startValue]);

  return (
    <>
      <div
        className={`relative flex w-full min-w-[120px] flex-col md:flex ${className ?? ''}`}
        onClick={handleClickDiv}
      >
        {value && (
          <Typography className='absolute top-0 pl-3'>{placeholder}</Typography>
        )}
        <Typography
          className={`absolute pl-0 md:pl-3 ${value ? 'top-2/3 -translate-y-1/3' : 'top-1/2 -translate-y-1/2 text-grey-400'}`}
        >
          {value ? isoToDateFormat(value) : placeholder}
        </Typography>
        <input
          type='date'
          className='absolute top-1/2 -ml-4 w-full -translate-y-1/2 cursor-pointer bg-transparent outline-none md:-ml-0'
          placeholder={placeholder}
          value={value}
          onChange={handleChangeInput}
        />
      </div>
    </>
  );
}
