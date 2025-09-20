'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TabBar } from '@/shared/ui/tab-bar';
import { Typography } from '@/shared/ui/typography';

import { IPanelTitle } from './PanelTitle.types';

const tabsHotelAdded = ['Информация', 'Питание'];

export function PanelTitle({ type }: IPanelTitle) {
  const patch = usePathname();
  const id = useSearchParams().get('id');
  const router = useRouter();

  const getTitle = (): string => {
    if (type === 'tour-operator') {
      if (patch.includes('info')) return 'Информация о рейсе';
      if (patch.includes('flights')) return 'Добавить рейс';
      if (patch.includes('hotels')) return 'Добавить отель';
      if (patch.includes('insurance')) return 'Страховки';
      if (patch.includes('tours-page')) return 'Туры';
      if (patch.includes('applications-page')) return 'Заявки';
      return 'Личный кабинет турагента';
    }

    if (type === 'hotelier') {
      if (patch.includes('applications-page')) return 'Заявки';
      if (patch.includes('hotels')) return 'Отели';
      if (patch.includes('rooms')) return 'Номера';
      return 'Личный кабинет отельера';
    }

    if (type === 'tourist') {
      if (patch.includes('settings')) return 'Настройки';
      if (patch.includes('trips')) return 'Поездки';
      if (patch.includes('reviews')) return 'Мои отзывы';
      if (patch.includes('documents')) return 'Документы';
      if (patch.includes('favorites')) return 'Избранное';
      return 'Личные данные';
    }

    return '';
  };

  const title = getTitle();

  // вычисляем открытие табов
  const openTabsAddHotel = patch.includes('change-hotel');

  const [activeTab, setActiveTab] = useState<string>('Отель');

  useEffect(() => {
    if (patch.includes('food')) setActiveTab('Питание');
    else if (patch.includes('rooms')) setActiveTab('Номера');
    else if (patch.includes('dates')) setActiveTab('Даты');
    else setActiveTab('Отель');
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
    }
  };

  return (
    <div
      className={`h-[162px] rounded-b-2xl bg-blue-600 py-5 pb-[30px] md:rounded-b-[100px] md:py-14 ${openTabsAddHotel ? 'h-[268px]' : 'h-[240px]'}`}
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
