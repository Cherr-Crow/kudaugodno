'use client';

import React, { useEffect, useState } from 'react';

import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { TabBar } from '@/shared/ui/tab-bar';

import { ISearchBlock } from './SearchBlock.types';
import { SearchBlockSkeleton } from './SearchBlockSkeleton';

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
  updateUrlParams,
  className,
}: ISearchBlock) {
  const [tab, setTabState] = useState<'Туры' | 'Отели'>(
    initialTab ? 'Туры' : 'Отели',
  );
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTabState(initialTab ?? 'Туры');
  }, [initialTab]);

  const handleTabChange = (newTab: 'Туры' | 'Отели') => {
    setTabState(newTab);
    if (setTab) {
      setTab(newTab);
    }
  };
  useEffect(() => {
    setIsClient(true);

    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);
  if (!isClient) return null;

  return (
    <div className={`flex w-full flex-col items-center gap-6 md:gap-3 ${className}`}>
      {isLoaded ? (
        <>
          <TabBar
            tabs={['Туры', 'Отели']}
            svgTab={['airplane', 'sofa']}
            activeTab={tab}
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
            updateUrlParams={updateUrlParams}
          />
        </>
      ) : (
        <SearchBlockSkeleton />
      )}
    </div>
  );
}
