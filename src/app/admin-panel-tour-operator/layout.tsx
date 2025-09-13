'use client';

import React, { createContext, Suspense, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { AdminPanelDashboard } from '@/widgets/admin-panel/admin-panel-dashboard';
import { PanelTitle } from '@/widgets/admin-panel/panel-title/PanelTitle';

// Контекст для проброса количества заявок
export const ApplicationsContext = createContext<{
  countApplications: number;
  setCountApplications: (n: number) => void;
}>({
  countApplications: 0,
  setCountApplications: () => {},
});

export default function AdminPanelTourOperatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [openDashboard, setOpenDashboard] = useState<boolean>(true);
  const [countApplications, setCountApplications] = useState(0);

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
    <ApplicationsContext.Provider
      value={{ countApplications, setCountApplications }}
    >
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
    </ApplicationsContext.Provider>
  );
}
