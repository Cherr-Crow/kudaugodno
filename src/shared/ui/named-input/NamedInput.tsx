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
  } = props;
  const [value, setValue] = useState(startValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    getValue(event.target.value);
  };

  return (
    <div className={`flex w-full flex-col gap-3 ${className ?? ''}`}>
      {title && <Typography variant='l-bold'>{title}</Typography>}
      <input
        type={type}
        className='w-full rounded-md border border-blue-600 px-4 py-2'
        placeholder={placeholder ?? ''}
        value={value}
        onChange={handleChange}
        name={name}
        autoComplete='on'
      />
    </div>
  );
}
