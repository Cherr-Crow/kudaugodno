'use client';

import React, { useEffect, useState } from 'react';

import { Typography } from '@/shared/ui/typography';

import { SvgSprite } from '../../svg-sprite';
// eslint-disable-next-line import/order
import { IInputDateForSearchBlock } from './InputDateForSearchBlock.types';

export function InputDateForSearchBlock({
  placeholder,
  getValue,
  className,
  startValue,
}: IInputDateForSearchBlock) {
  const [value, setValue] = useState<string>(startValue ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const russianDateFormat = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  const formatDateToDayMonth = (isoDate: string): string => {
    const date = new Date(isoDate);
    return russianDateFormat.format(date);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoDate = e.target.value;
    setValue(isoDate);
    getValue(isoDate);
  };

  const handleClickDiv = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    inputRef.current?.showPicker?.();
  };

  const handleFocusDiv = () => {
    setIsFocused(true);
    inputRef.current?.showPicker?.();
  };

  useEffect(() => {
    setValue(startValue || '');
  }, [startValue]);

  return (
    <div
      tabIndex={0}
      className={`relative w-full outline-none ${className ?? ''}`}
      onClick={handleClickDiv}
      onFocus={handleFocusDiv}
      onBlur={() => setIsFocused(false)}
      aria-label='Выберите дату'
    >
      <div className='flex min-h-[50px] flex-col justify-center'>
        {value && (
          <Typography
            variant='s'
            className='h-[16px] text-grey-400 md:text-sm lg:text-sm'
          >
            {placeholder}
          </Typography>
        )}
        <Typography
          className={`${value ? 'h-[18px] font-medium md:font-semibold' : 'text-[16px] text-grey-400 md:text-base'} `}
        >
          {value ? (
            <span className={`${isFocused && 'bg-[#3367D1] text-white'}`}>
              {formatDateToDayMonth(value)}
            </span>
          ) : (
            placeholder
          )}
        </Typography>
      </div>
      <input
        ref={inputRef}
        type='date'
        tabIndex={-1}
        className='cursor-pointerappearance-none h-full w-full bg-transparent font-medium outline-none md:font-semibold'
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
  );
}
