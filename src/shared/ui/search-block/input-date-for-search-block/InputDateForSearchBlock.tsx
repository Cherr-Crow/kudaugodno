'use client';

import React, { useState } from 'react';

import { Typography } from '@/shared/typography';

import { IInputDateForSearchBlock } from './InputDateForSearchBlock.types';

export function InputDateForSearchBlock({
  placeholder,
  getValue,
  className,
  startValue,
}: IInputDateForSearchBlock) {
  const [value, setValue] = useState<string | null>(startValue ?? null);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const val = new Date(e.target.value).toLocaleDateString();
      setValue(val);
      getValue(val);
    }
  };

  return (
    <>
      <div
        className={`relative hidden w-full min-w-[120px] flex-col justify-center md:flex ${className ?? ''}`}
      >
        {value && (
          <Typography className='absolute top-0 pl-3'>{placeholder}</Typography>
        )}
        <Typography
          className={`absolute pl-3 ${value ? 'top-2/3 -translate-y-1/3' : 'top-1/2 -translate-y-1/2 text-grey-400'} `}
        >
          {value ?? placeholder}
        </Typography>
        <input
          type='date'
          className={`absolute top-1/2 w-full -translate-y-1/2 bg-transparent outline-none`}
          placeholder={placeholder}
          value={''}
          onChange={handleChangeInput}
        />
      </div>

      <div
        className={`relative flex h-14 w-full flex-col justify-center md:hidden ${className ?? ''}`}
      >
        {value && <Typography className='absolute top-0'>{placeholder}</Typography>}
        <Typography
          className={`absolute ${value ? 'top-2/3 -translate-y-1/3' : 'top-1/2 -translate-y-1/2 text-grey-400'} `}
        >
          {value ?? placeholder}
        </Typography>
        <input
          type='date'
          className={`absolute top-1/2 w-5/6 -translate-y-1/2 bg-transparent outline-none`}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={handleChangeInput}
        />
      </div>
    </>
  );
}
