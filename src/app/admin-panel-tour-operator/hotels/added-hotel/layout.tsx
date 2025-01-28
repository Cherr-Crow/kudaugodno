'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

export default function AddHotelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const patch = usePathname();

  return (
    <section className='w-full'>
      {children}
      <div
        className={`mt-10 justify-end gap-4 ${patch.includes('added-hotel/dates') ? 'hidden' : 'flex'}`}
      >
        <ButtonCustom variant='secondary' size='m'>
          <Typography children='Отменить' variant='l-bold' />
        </ButtonCustom>
        <ButtonCustom variant='primary' size='m'>
          <Typography children='Сохранить' variant='l-bold' />
        </ButtonCustom>
      </div>
    </section>
  );
}
