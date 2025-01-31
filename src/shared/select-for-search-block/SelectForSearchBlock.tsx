import React from 'react';
import { ISelectForSearchBlock } from './SelectForSearchBlock.types';
import { Select } from '@/shared/ui/select';

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

export function SelectForSearchBlock({}: ISelectForSearchBlock) {
  return (
    <div className='w-full'>
      <Select options={numberOfGuests} className='' />
    </div>
  );
}
