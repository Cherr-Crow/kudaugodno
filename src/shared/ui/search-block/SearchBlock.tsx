'use client';

import React, { useState } from 'react';

import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { TabBar } from '@/shared/ui/tab-bar';

import { ISearchBlock } from './SearchBlock.types';

export function SearchBlock({}: ISearchBlock) {
  const [tab, setTab] = useState<'Туры' | 'Отели'>('Туры');

  function handelTab(tab: 'Туры' | 'Отели'): void {
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
      <SearchTour type={tab} />
    </div>
  );
}
