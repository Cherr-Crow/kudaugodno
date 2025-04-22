import React, { useRef } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IInputForSearchBlock } from './InputForSearchBlock.types';

export function InputForSearchBlock({
  placeholder,
  getValue,
  className,
  value,
}: IInputForSearchBlock) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getValue(e.target.value);
  };

  const handleReset = () => {
    getValue('');
    inputRef.current?.focus();
  };
  return (
    <div
      className={`flex w-fit min-w-[120px] items-center gap-3 pr-2 ${className ?? ''}`}
    >
      <div className='flex flex-col'>
        {value && <Typography>{placeholder}</Typography>}
        <input
          ref={inputRef}
          type='text'
          className='w-full bg-transparent font-bold outline-none placeholder:font-normal'
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={placeholder}
        />
      </div>
      {value && (
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
