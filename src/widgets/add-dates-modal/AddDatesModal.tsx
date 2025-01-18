import React, { useEffect, useRef } from 'react';
import { IAddDatesModal } from './AddDatesModal.types';
import { Typography } from '@/shared/typography';

export function AddDatesModal({}: IAddDatesModal) {
  return (
    <div className=''>
      <div className=''>
        <div className='flex w-full flex-col gap-3'>
          <Typography children='Дата заселения ' variant='l-bold' />
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
          <Typography children='Дата выселения  ' variant='l-bold' />
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
