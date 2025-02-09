'use client';

import React, { Suspense } from 'react';

export default function AddHotelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='w-full'>
      <Suspense>{children}</Suspense>
    </section>
  );
}
