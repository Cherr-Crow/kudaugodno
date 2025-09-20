import React from 'react';

import { Typography } from '@/shared/ui/typography';

import { IAddedButton } from './AddedButton.types';

export function AddedButton({ text, onClick, className }: IAddedButton) {
  return (
    <div
      className={`flex cursor-pointer gap-2 ${className ?? ''}`}
      onClick={onClick}
    >
      <div className='flex h-6 w-6 items-center justify-center rounded-full border border-blue-700 text-2xl font-bold'>
        <Typography className='text-blue-700'>+</Typography>
      </div>
      <Typography className='text-blue-700'>{text}</Typography>
    </div>
  );
}
