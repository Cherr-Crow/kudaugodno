'use client';

import { useSearchParams } from 'next/navigation';

import { AddedHotelField } from '@/widgets/admin-panel/added-hotel-field';

export default function AddedHotel() {
  const id = useSearchParams().get('id');

  if (!id) return;

  return (
    <div className='flex w-full flex-col gap-10'>
      <AddedHotelField hotelId={+id} />
    </div>
  );
}
