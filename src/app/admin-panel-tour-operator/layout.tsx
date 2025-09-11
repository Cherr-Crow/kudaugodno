'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { AdminPanelDashboard } from '@/widgets/admin-panel/admin-panel-dashboard';
import { PanelTitle } from '@/widgets/admin-panel/panel-title/PanelTitle';

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
      path.includes('added-tour') ||
      path.includes('info')
    ) {
      setOpenDashboard(false);
    } else {
      setOpenDashboard(true);
    }
  }, [path]);

  return (
    <Suspense>
      <section className='grid h-full'>
        <PanelTitle type={'tour-operator'} />
        <div className='container mb-10 flex h-full items-start gap-5 py-10'>
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
