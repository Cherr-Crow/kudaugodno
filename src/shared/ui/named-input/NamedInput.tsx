'use client';

import React, { useState } from 'react';

import { Typography } from '@/shared/typography';

import { INamedInput } from './NamedInput.types';

export function NamedInput(props: INamedInput) {
  const {
    title,
    placeholder,
    name,
    getValue,
    className,
    type = 'text',
    startValue,
    disabled,
  } = props;
  const [value, setValue] = useState(startValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setValue(event.target.value);
  };

  const handlePushValue = () => {
    if (!getValue) return;
    getValue(value);
  };

  return (
    <div
      className={`flex w-full flex-col gap-3 ${className ?? ''}`}
      onBlur={handlePushValue}
    >
      {title && <Typography variant='l-bold'>{title}</Typography>}
      <input
        type={type}
        className='w-full rounded-md border border-blue-600 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
        placeholder={placeholder ?? ''}
        value={disabled ? startValue : value}
        onChange={handleChange}
        name={name}
        autoComplete='on'
      />
    </div>
  );
}
