'use client';

import React, { useEffect, useState } from 'react';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/typography';

export default function AddHotelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='w-full'>
      {children}
      <div className='mt-10 flex justify-end gap-4'>
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
