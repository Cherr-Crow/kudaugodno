import React from 'react';

import { Select } from '@/shared/ui/select';

import { ISelectForSearchBlock } from './SelectForSearchBlock.types';

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

export function SelectForSearchBlock({ className }: ISelectForSearchBlock) {
  return (
    <div className={`w-full ${className ?? ''}`}>
      <Select options={numberOfGuests} className='w-full' />
    </div>
  );
}
