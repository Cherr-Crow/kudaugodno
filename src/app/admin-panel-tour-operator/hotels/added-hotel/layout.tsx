'use client';

import React, { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

export default function AddHotelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const patch = usePathname();
  const [data, setData] = useState<{ results: [] } | null>(null);

  const handleSetData = () => {
    fetch('https://ku.mer1d1an.ru/api/v1/hotels/?limit=10')
      .then((res) => res.json())
      .then((data: { results: [] }) => setData(data));
  };

  return (
    <section className='w-full'>
      {children}
      <div
        className={`mt-10 justify-end gap-4 ${patch.includes('added-hotel/dates') ? 'hidden' : 'flex'}`}
      >
        {data && (
          <>
            {[...data.results, 'данные']}
            <p>данные получил готов рисовать)</p>
          </>
        )}
        <ButtonCustom variant='secondary' size='m'>
          <Typography children='Отменить' variant='l-bold' />
        </ButtonCustom>
        <ButtonCustom variant='primary' size='m' onClick={handleSetData}>
          <Typography children='Сохранить' variant='l-bold' />
        </ButtonCustom>
      </div>
    </section>
  );
}
