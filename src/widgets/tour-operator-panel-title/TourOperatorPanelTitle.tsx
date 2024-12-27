'use client';

import React, { useEffect, useState } from 'react';
import { ITourOperatorPanelTitle } from './TourOperatorPanelTitle.types';
import { usePathname, useRouter } from 'next/navigation';
import { Typography } from '@/shared/typography';
import { TabBar } from '@/shared/ui/tab-bar';

const tabsHotelAdded = ['Отель', 'Питание', 'Номера', 'Даты'];

export function TourOperatorPanelTitle({}: ITourOperatorPanelTitle) {
  const patch = usePathname();
  const router = useRouter();

  const [title, setTitle] = useState('Личный кабинет туроператора');
  const [openTabsAddHotel, setOpenTabsAddHotel] = useState(false);

  useEffect(() => {
    if (patch.includes('added-flights')) {
      setTitle('Добавить рейс');
      setOpenTabsAddHotel(false);
      return;
    } else if (patch.includes('added-hotel')) {
      setTitle('Добавить отель');
      setOpenTabsAddHotel(true);
      return;
    } else {
      setTitle('Личный кабинет туроператора');
      setOpenTabsAddHotel(false);
      return;
    }
  }, [patch]);

  const handleTabName = (tabName: string) => {
    switch (tabName) {
      case 'Отель':
        router.push('/admin-panel-tour-operator/hotels/added-hotel');
        break;
      case 'Питание':
        router.push('/admin-panel-tour-operator/hotels/added-hotel/food');
        break;
      case 'Номера':
        router.push('/admin-panel-tour-operator/hotels/added-hotel/rooms');
        break;
      case 'Даты':
        router.push('/admin-panel-tour-operator/hotels/added-hotel/dates');
        break;
      default:
        break;
    }
  };

  return (
    <div className='rounded-b-2xl bg-blue-600 py-10 md:rounded-b-[100px] md:py-12'>
      <div className='container'>
        <Typography
          children={title}
          variant='h4'
          className='text-white md:text-5xl md:font-medium'
        />
        <div className='mt-10'>
          {openTabsAddHotel && (
            <TabBar tabs={tabsHotelAdded} getTabName={handleTabName} />
          )}
        </div>
      </div>
    </div>
  );
}
