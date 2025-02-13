'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { Typography } from '@/shared/typography';
import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';

export default function AddedHotel() {
  const id = useSearchParams().get('id');

  if (!id) return;

  return (
    <div className='flex w-full flex-col gap-10'>
      <Typography children='Отель' variant='h4' />
      <AddedHotelField hotelId={+id} />
    </div>
  );
}
