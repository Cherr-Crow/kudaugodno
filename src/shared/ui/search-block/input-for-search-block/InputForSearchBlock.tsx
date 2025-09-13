import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IInputForSearchBlock } from './InputForSearchBlock.types';

export interface InputForSearchBlockRef {
  focusInput: () => void;
}

export const InputForSearchBlock = forwardRef<
  InputForSearchBlockRef,
  IInputForSearchBlock
>(({ placeholder, getValue, className, value, type }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus({ preventScroll: true });
      setIsFocused(true);
    },
  }));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      inputRef.current?.blur();

      const inputs = Array.from(
        document.querySelectorAll<HTMLInputElement>('#search-tour-search-bar input'),
      );

      const currentIndex = inputs.findIndex((inp) => inp === inputRef.current);

      const nextEmpty = inputs
        .slice(currentIndex + 1)
        .find((inp) => inp.value === '');

      if (nextEmpty) {
        nextEmpty.focus();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getValue(e.target.value);
  };

  const handleReset = () => {
    getValue('');
    setIsFocused(true);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
  };

  const handleClickDiv = () => {
    setIsFocused(true);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
  };

  return (
    <div
      onClick={handleClickDiv}
      className={`flex w-fit items-center gap-3 ${className ?? ''}`}
    >
      <div className='flex w-full flex-col'>
        {value && (
          <Typography variant='s' className='text-grey-400 md:text-sm lg:text-sm'>
            {placeholder}
          </Typography>
        )}
        <input
          tabIndex={0}
          ref={inputRef}
          type='text'
          className={`w-full bg-transparent text-base font-medium leading-[18px] outline-none placeholder:text-sm placeholder:font-normal md:font-semibold md:placeholder:text-base ${
            isFocused ? 'border-blue-500' : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {value && (
        <SvgSprite
          name='cross'
          width={20}
          color='#adadad'
          onClick={handleReset}
          className={`${type !== 'Туры' ? 'md:mr-1 lg:mr-3' : ''} cursor-pointer md:mr-[13px] lg:mr-[18px]`}
        />
      )}
    </div>
  );
});

InputForSearchBlock.displayName = 'InputForSearchBlock';
