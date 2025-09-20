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
    } else {
      setSubtitle('Общая информация');
    }
  }, [path]);

  return (
    <section className='w-full'>
      <Typography variant='h4' className='mb-[14px] text-blue-950'>
        {subtitle}
      </Typography>
      {children}
    </section>
  );
}
