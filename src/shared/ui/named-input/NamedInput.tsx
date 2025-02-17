'use client';

import React, { useState } from 'react';

import { Typography } from '@/shared/typography';

import { INamedInput } from './NamedInput.types';

export function NamedInput({
  title,
  placeholder,
  name,
  getValue,
  className,
  type = 'text',
  startValue,
}: INamedInput) {
  const [value, setValue] = useState(startValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === 'number' ? Number(event.target.value) : event.target.value;
    setValue(newValue);
    getValue?.(newValue);
  };

  return (
    <div className={`flex w-full flex-col gap-3 ${className ?? ''}`}>
      {title && <Typography children={title} variant='l-bold' />}
      <input
        type={type}
        className='w-full rounded-md border border-blue-600 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
        placeholder={placeholder ?? ''}
        value={value}
        onChange={handleChange}
        name={name}
        autoComplete='on'
      />
    </div>
  );
}
