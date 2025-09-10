'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { AdminPanelDashboard } from '@/widgets/admin-panel/admin-panel-dashboard';
import { PanelTitle } from '@/widgets/admin-panel/panel-title/PanelTitle';

export default function AdminPanelHotelierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [openDashboard, setOpenDashboard] = useState<boolean>(true);

  useEffect(() => {
    if (
      path.includes('added-hotel') ||
      path.includes('added-flights') ||
      path.includes('change-hotel') ||
      path.includes('added-tour')
    ) {
      setOpenDashboard(false);
    } else {
      setOpenDashboard(true);
    }
  }, [path]);

  return (
    <Suspense>
      <section className='grid h-full'>
        <PanelTitle type='hotelier' />
        <div className='container mb-10 flex h-full items-start gap-5 py-10'>
          {openDashboard && (
            <div className='hidden lg:flex'>
              <AdminPanelDashboard type={'hotelier'} />
            </div>
          )}
          {children}
        </div>
      </section>
    </Suspense>
  );
}
