'use client';

import React, { useEffect, useState } from 'react';

import { Typography } from '@/shared/ui/typography';

import { IInputDateForSearchBlock } from './InputDateForSearchBlock.types';
import { isoToDateFormat } from '../../../utils/isoToDateFormat';
import { SvgSprite } from '../../svg-sprite';

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
        className={`relative h-full w-full ${className ?? ''}`}
        onClick={handleClickDiv}
      >
        <div className='flex h-full flex-col justify-center'>
          {value && (
            <Typography className='text-sm text-grey-400 md:text-base'>
              {placeholder}
            </Typography>
          )}
          <Typography
            className={`${value ? 'font-medium md:font-semibold' : 'text-sm text-grey-400 md:text-base'}`}
          >
            {value
              ? isoToDateFormat(value)
                  .split('.')
                  .map((part, i) => (i === 2 ? part.slice(2) : part))
                  .join('.')
              : placeholder}
          </Typography>
        </div>
        <input
          type='date'
          className='absolute left-0 top-8 w-full cursor-pointer appearance-none bg-transparent font-medium outline-none md:font-semibold'
          placeholder={placeholder}
          value={value}
          onChange={handleChangeInput}
        />
        {/* Иконка */}
        <SvgSprite
          className='pointer-events-none absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 md:right-2 md:h-7 md:w-7 lg:right-4'
          name={'calendar'}
          color='grey'
        />
      </div>
    </>
  );
}
