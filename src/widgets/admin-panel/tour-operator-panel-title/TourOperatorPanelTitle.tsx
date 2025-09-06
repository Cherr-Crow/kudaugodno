'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TabBar } from '@/shared/ui/tab-bar';
import { Typography } from '@/shared/ui/typography';

import { ITourOperatorPanelTitle } from './TourOperatorPanelTitle.types';

const tabsHotelAdded = ['Информация', 'Питание'];

export function TourOperatorPanelTitle({}: ITourOperatorPanelTitle) {
  const patch = usePathname();
  const id = useSearchParams().get('id');
  const router = useRouter();

  const [title, setTitle] = useState('Личный кабинет турагента');
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
    } else if (patch.includes('insurance')) {
      setTitle('Страховки');
      setOpenTabsAddHotel(false);
      return;
    } else if (patch.includes('added-hotel')) {
      setTitle('Добавить отель');
      setOpenTabsAddHotel(false);
      return;
    } else {
      setTitle('Личный кабинет турагента');
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
  }, [patch]);

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
        router.push(
          `/admin-panel-tour-operator/hotels/change-hotel/dates/?id=${id}`,
        );
        break;
      case 'Питание':
        // router.push(`/admin-panel-tour-operator/hotels/change-hotel/food/?id=${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`rounded-b-2xl bg-blue-600 py-5 pb-[30px] md:rounded-b-[100px] md:py-14 ${openTabsAddHotel ? 'h-[268px]' : 'h-[240px]'}`}
    >
      <div className='container'>
        <Typography
          variant='h4'
          className='mt-[14px] text-[28px] leading-8 text-white md:text-[40px] md:font-medium lg:text-[60px]'
        >
          {title}
        </Typography>
        <div className='mt-[52px] w-[344px]'>
          {openTabsAddHotel && (
            <TabBar
              className='h-[66px]'
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
