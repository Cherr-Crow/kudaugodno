import React from 'react';

import { Typography } from '@/shared/typography';

import { IAddedButton } from './AddedButton.types';

export function AddedButton({ text, onClick }: IAddedButton) {
  return (
    <div className='flex cursor-pointer gap-2' onClick={onClick}>
      <div className='flex h-6 w-6 items-center justify-center rounded-full border border-blue-700 text-2xl font-bold'>
        <Typography children='+' className='text-blue-700' />
      </div>
      <Typography children={text} className='text-blue-700' />
    </div>
  );
}
