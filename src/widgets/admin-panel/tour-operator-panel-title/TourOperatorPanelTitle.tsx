'use client';

import React, { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Typography } from '@/shared/typography';
import { TabBar } from '@/shared/ui/tab-bar';

import { ITourOperatorPanelTitle } from './TourOperatorPanelTitle.types';

const tabsHotelAdded = ['Отель', 'Номера', 'Даты'];

export function TourOperatorPanelTitle({}: ITourOperatorPanelTitle) {
  const patch = usePathname();
  const id = useSearchParams().get('id');
  const router = useRouter();

  const [title, setTitle] = useState('Личный кабинет туроператора');
  const [openTabsAddHotel, setOpenTabsAddHotel] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (patch.includes('added-flights')) {
      setTitle('Добавить рейс');
      setOpenTabsAddHotel(false);
      return;
    } else if (patch.includes('change-hotel')) {
      setTitle('Добавить отель');
      setOpenTabsAddHotel(true);
      return;
    } else {
      setTitle('Личный кабинет туроператора');
      setOpenTabsAddHotel(false);
      return;
    }
  }, [patch]);

  useEffect(() => {
    if (patch.includes('food')) {
      setActiveTab('Питание');
    } else if (patch.includes('rooms')) {
      setActiveTab('Номера');
    } else if (patch.includes('dates')) {
      setActiveTab('Даты');
    } else {
      setActiveTab('Отель');
    }
  }, []);

  const handleTabName = (tabName: string) => {
    if (!id) return;

    switch (tabName) {
      case 'Отель':
        router.push(`/admin-panel-tour-operator/hotels/change-hotel/?id=${id}`);
        break;
      case 'Номера':
        router.push(
          `/admin-panel-tour-operator/hotels/change-hotel/rooms/?id=${id}`,
        );
        break;
      case 'Даты':
        router.push('/admin-panel-tour-operator/hotels/change-hotel/dates');
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
            <TabBar
              tabs={tabsHotelAdded}
              getActiveTab={handleTabName}
              setTab={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}
