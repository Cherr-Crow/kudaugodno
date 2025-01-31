'use client';

import React, { useState } from 'react';
import { TabBar } from '@/shared/ui/tab-bar';

import { ISearchBlock } from './SearchBlock.types';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { SearchHotel } from './search-hotel';

export function SearchBlock({}: ISearchBlock) {
  const [tab, setTab] = useState<string>('Туры');

  function handelTab(tab: string): void {
    setTab(tab);
  }

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      <TabBar
        tabs={['Туры', 'Отели']}
        svgTab={['airplane', 'sofa']}
        getActiveTab={handelTab}
        variant='secondary'
      />
      {tab === 'Туры' ? <SearchTour /> : <SearchHotel />}
    </div>
  );
}
