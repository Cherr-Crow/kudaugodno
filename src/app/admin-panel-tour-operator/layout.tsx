'use client';

import { AdminPanelDashboard } from '@/widgets/admin-panel-dashboard';
import { TourOperatorPanelTitle } from '@/widgets/tour-operator-panel-title';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AdminPanelTourOperatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [openDashboard, setOpenDashboard] = useState<boolean>(true);

  useEffect(() => {
    if (path.includes('added-hotel') || path.includes('added-flights')) {
      setOpenDashboard(false);
    } else {
      setOpenDashboard(true);
    }
  }, [path]);

  return (
    <section className='grid'>
      <TourOperatorPanelTitle />
      <div className='container mb-20 mt-10 flex h-full gap-5'>
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
