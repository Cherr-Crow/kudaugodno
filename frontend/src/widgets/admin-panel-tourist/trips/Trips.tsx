'use client';
import { useState } from 'react';

import { TabBar } from '@/shared/ui/tab-bar';

import { ActiveTrips } from './ActiveTrips';
import { ArchivalTrips } from './ArchivalTrips';

export function Trips({}) {
  const [tab, setTab] = useState<'Активные' | 'Архивные'>('Активные');

  function handleTab(tab: 'Активные' | 'Архивные'): void {
    setTab(tab);
  }

  return (
    <section className='relative w-full'>
      <div className='mb-6 md:mb-4 lg:mb-6'>
        <TabBar tabs={['Активные', 'Архивные']} getActiveTab={handleTab} />
      </div>
      <div>{tab === 'Активные' ? <ActiveTrips /> : <ArchivalTrips />}</div>
    </section>
  );
}
