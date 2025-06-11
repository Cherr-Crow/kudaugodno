'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Typography } from '@/shared/ui/typography';

export default function AddHotelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (path.includes('food')) {
      setSubtitle('Питание');
    } else if (path.includes('rooms')) {
      setSubtitle('Номера');
    } else if (path.includes('dates')) {
      setSubtitle('Даты тура');
    } else {
      setSubtitle('Отель');
    }
  }, [path]);

  return (
    <section className='w-full'>
      <Typography variant='h4'>{subtitle}</Typography>
      {children}
    </section>
  );
}
