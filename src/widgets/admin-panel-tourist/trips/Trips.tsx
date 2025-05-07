'use client';
import { useState } from 'react';

import { TabBar } from '@/shared/ui/tab-bar';
import { Typography } from '@/shared/ui/typography';

import { ActiveTrips } from './ActiveTrips';
import { ArchivalTrips } from './ArchivalTrips';

export function Trips({}) {
  const [tab, setTab] = useState<'Активные' | 'Архивные'>('Активные');

  function handleTab(tab: 'Активные' | 'Архивные'): void {
    setTab(tab);
  }

  return (
    <section className='relative'>
      <div className='absolute left-0 top-0 z-[-1] h-[213px] w-full rounded-bl-2xl rounded-br-2xl bg-[url("/admin-panel-tourist-bg375.svg")] bg-cover bg-no-repeat md:h-[427px] md:rounded-bl-[100px] md:rounded-br-[100px] md:bg-[url("/admin-panel-tourist-bg960.svg")] lg:md:rounded-br-[100px] lg:bg-[url("/admin-panel-tourist-bg1446.svg")]'></div>

      <div className='container pb-16 pt-7 lg:pt-8'>
        <div className='mb-6 md:mb-4 lg:mb-6'>
          <Typography
            variant='h1'
            className='mb-1 text-[32px] font-semibold text-white md:mb-6 md:text-[40px] md:font-medium lg:text-[60px]'
          >
            Поездки
          </Typography>
          <TabBar tabs={['Активные', 'Архивные']} getActiveTab={handleTab} />
        </div>
        <div>{tab === 'Активные' ? <ActiveTrips /> : <ArchivalTrips />}</div>
      </div>
    </section>
  );
}
