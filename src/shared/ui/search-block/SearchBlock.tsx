'use client';

import React, { useState } from 'react';

import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { TabBar } from '@/shared/ui/tab-bar';

import { ISearchBlock } from './SearchBlock.types';

export function SearchBlock({
  tab: initialTab,
  setTab,
  departureCity,
  where,
  checkInDate,
  checkOutDate,
  nights,
  guests,
  setDepartureCity,
  setWhere,
  setCheckInDate,
  setCheckOutDate,
  setNights,
  setGuests,
}: ISearchBlock) {
  const [tab, setTabState] = useState<'Туры' | 'Отели'>(initialTab ?? 'Туры');

  const handleTabChange = (newTab: 'Туры' | 'Отели') => {
    setTabState(newTab);
    if (setTab) {
      setTab(newTab);
    }
  };

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      <TabBar
        tabs={['Туры', 'Отели']}
        svgTab={['airplane', 'sofa']}
        setTab={tab}
        getActiveTab={handleTabChange}
        variant='secondary'
      />
      <SearchTour
        type={tab}
        departureCity={departureCity}
        where={where}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        nights={nights}
        guests={guests}
        setDepartureCity={setDepartureCity}
        setWhere={setWhere}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setNights={setNights}
        setGuests={setGuests}
      />
    </div>
  );
}
