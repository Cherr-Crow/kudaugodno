// 'use client';

import React from 'react';

import { Typography } from '@/shared/typography';
import { Hotel } from '@/types/hotel';
import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';

interface Params {
  id: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const data = await fetch('https://ku.mer1d1an.ru/api/v1/hotels/').then((res) =>
    res.json(),
  );

  return data.results.map((hotel: Hotel) => ({
    id: hotel.id.toString(),
  }));
}

export default async function AddedHotel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // const patchId = useSearchParams().get('id');
  // const { data } = useGetOneHotelQuery(patchId ? +patchId : null);

  return (
    <div className='flex w-full flex-col gap-10'>
      <Typography children='Отель' variant='h4' />
      {/*{data && <AddedHotelField hotelId={+id} />}*/}
      <AddedHotelField hotelId={+id} />
    </div>
  );
}
