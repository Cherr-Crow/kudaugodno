import React, { useState } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IInputForSearchBlock } from './InputForSearchBlock.types';

export function InputForSearchBlock({
  placeholder,
  getValue,
  className,
}: IInputForSearchBlock) {
  const [value, setValue] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    getValue(e.target.value);
  };

  const handleReset = () => {
    setValue('');
  };

  return (
    <div
      className={`flex w-fit min-w-[120px] items-center gap-3 pr-2 ${className ?? ''}`}
    >
      <div className='flex flex-col'>
        {!!value && <Typography className=''>{placeholder}</Typography>}
        <input
          type='text'
          className='w-full bg-transparent font-bold outline-none placeholder:font-normal'
          placeholder={placeholder}
          value={value}
          onChange={handleChangeInput}
          name={placeholder}
        />
      </div>
      {!!value && (
        <SvgSprite
          name='cross'
          width={20}
          color='#adadad'
          onClick={handleReset}
          className='cursor-pointer'
        />
      )}
    </div>
  );
}
