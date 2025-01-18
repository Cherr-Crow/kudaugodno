import React, { useState } from 'react';
import { INamedInput } from './NamedInput.types';
import { Typography } from '@/shared/typography';

export function NamedInput({
  title,
  placeholder,
  name,
  getValue,
  className,
}: INamedInput) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    getValue(event.target.value);
  };

  return (
    <div className={`flex w-full flex-col gap-3 ${className ?? className}`}>
      {title && <Typography children={title} variant='l-bold' />}
      <input
        type='text'
        className='w-full rounded-md border border-blue-600 px-4 py-2'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        autoComplete='on'
      />
    </div>
  );
}
