import React from 'react';

import { Typography } from '@/shared/typography';

import { IAddDatesModal } from './AddDatesModal.types';

export function AddDatesModal({}: IAddDatesModal) {
  return (
    <div className=''>
      <div className=''>
        <div className='flex w-full flex-col gap-3'>
          <Typography variant='l-bold'>Дата заселения</Typography>
          <input
            type='date'
            className='w-[400px] rounded-md border border-grey-600 px-4 py-2'
            placeholder='12.12.2025'
            onChange={(e) => {
              console.log(new Date(e.target.value));
            }}
            name='city'
          />
        </div>
        <div className='flex w-full flex-col gap-3'>
          <Typography variant='l-bold'>Дата выселения</Typography>
          <input
            type='date'
            className='w-[400px] rounded-md border border-grey-600 px-4 py-2'
            placeholder='12.12.2025'
            onChange={(e) => {
              console.log(new Date(e.target.value));
            }}
            name='city'
          />
        </div>
      </div>
    </div>
  );
}
