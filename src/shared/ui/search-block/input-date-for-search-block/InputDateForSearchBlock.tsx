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
    <div className={`flex w-full min-w-[120px] flex-col ${className ?? ''}`}>
      <Typography className=''>{placeholder}</Typography>
      <input
        type='date'
        className={`w-full bg-transparent ${!!value && 'font-bold'} w-full outline-none`}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeInput}
      />
    </div>
  );
}
