'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { AdminPanelDashboard } from '@/widgets/admin-panel/admin-panel-dashboard';
import { TourOperatorPanelTitle } from '@/widgets/admin-panel/tour-operator-panel-title';

export default function AdminPanelTourOperatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [openDashboard, setOpenDashboard] = useState<boolean>(true);

  useEffect(() => {
    if (
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
        <TourOperatorPanelTitle />
        <div className='container flex h-full items-start gap-5 py-9'>
          {openDashboard && (
            <div className='hidden lg:flex'>
              <AdminPanelDashboard type={'tour-operator'} />
            </div>
          )}
          {children}
        </div>
      </section>
    </Suspense>
  );
}
