'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Typography } from '@/shared/typography';
import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';

export default function AddedHotel() {
  const patchId = useSearchParams().get('id');
  const { data } = useGetOneHotelQuery(patchId ? +patchId : null);

  return (
    <div className='flex w-full flex-col gap-10'>
      <Typography children='Отель' variant='h4' />
      {data && <AddedHotelField hotelId={data.id} />}
    </div>
  );
}
