import React from 'react';

import { ISelectForSearchBlock } from './SelectForSearchBlock.types';
import { Select } from '../ui/select';

export function SelectForSearchBlock({
  className,
  getValue,
}: ISelectForSearchBlock) {
  const numberOfGuests: string[] = [
    'Гостей',
    '1 гость',
    '2 гостя',
    '3 гостя',
    '4 гостя',
    '5 гостей',
    '6 гостей',
    '7 гостей',
    '8 гостей',
    '9 гостей',
    '10 гостей',
  ];

  const handleSelectChange = (value: string) => {
    getValue?.(value);
  };

  return (
    <div className={`w-full ${className ?? ''}`}>
      <Select
        options={numberOfGuests}
        onSelect={handleSelectChange}
        className='z-50 w-full'
      />
    </div>
  );
}
