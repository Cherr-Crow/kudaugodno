'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { AdminPanelDashboard } from '../../widgets/admin-panel/admin-panel-dashboard';
import { TourOperatorPanelTitle } from '../../widgets/admin-panel/tour-operator-panel-title';

export default function AdminPanelTourOperatorLayout({
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
      path.includes('change-hotel')
    ) {
      setOpenDashboard(false);
    } else {
      setOpenDashboard(true);
    }
  }, [path]);

  return (
    <section className='grid h-full'>
      <TourOperatorPanelTitle />
      <div className='container flex h-full gap-5 py-10'>
        {openDashboard && (
          <div className='hidden h-full md:flex'>
            <AdminPanelDashboard />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
