import React from 'react';

export default function AddHotelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className='w-full'>{children}</section>;
}
