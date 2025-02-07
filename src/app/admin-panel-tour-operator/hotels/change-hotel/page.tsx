'use client';

import React, { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/sericesApi/hotelsApi';
import { Typography } from '@/shared/typography';
import { Hotel } from '@/types/hotel';
import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';

export default function AddedHotel() {
  const patchId = useSearchParams().get('id');
  const { data } = useGetOneHotelQuery(patchId ? +patchId : null);
  const [value, setValue] = useState(data?.name || '');

  const hotel = useRef<Hotel>({} as Hotel);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='flex w-full flex-col gap-10'>
      <Typography children='Отель' variant='h4' />

      {data && <AddedHotelField hotelId={data.id} />}
    </div>
  );
}
