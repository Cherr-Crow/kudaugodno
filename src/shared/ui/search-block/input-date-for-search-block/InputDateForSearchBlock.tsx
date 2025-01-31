import React, { useState } from 'react';

import { Typography } from '@/shared/typography';

import { IInputDateForSearchBlock } from './InputDateForSearchBlock.types';

export function InputDateForSearchBlock({
  placeholder,
  getValue,
  className,
}: IInputDateForSearchBlock) {
  const [value, setValue] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    getValue(e.target.value);
  };

  return (
    <div
      className={`flex w-fit min-w-[120px] items-center gap-5 ${className ?? ''}`}
    >
      <div className='flex flex-col'>
        <Typography className=''>{placeholder}</Typography>
        <input
          type='date'
          className={`w-full bg-transparent ${!!value && 'font-bold'} outline-none`}
          placeholder={placeholder}
          value={value}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}
