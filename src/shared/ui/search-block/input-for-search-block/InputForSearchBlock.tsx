import React, { useRef } from 'react';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IInputForSearchBlock } from './InputForSearchBlock.types';

export function InputForSearchBlock({
  placeholder,
  getValue,
  className,
  value,
  type,
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
    <div className={`flex w-fit items-center gap-3 ${className ?? ''}`}>
      <div className='flex w-full flex-col'>
        {value && (
          <Typography className='text-sm text-grey-400 md:text-base'>
            {placeholder}
          </Typography>
        )}
        <input
          ref={inputRef}
          type='text'
          className='w-full bg-transparent text-base font-medium outline-none placeholder:text-sm placeholder:font-normal md:font-semibold md:placeholder:text-base'
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
          className={`${type !== 'Туры' ? 'md:mr-1 lg:mr-3' : ''} cursor-pointer md:mr-5`}
        />
      )}
    </div>
  );
}
