'use client';

import React, { useEffect, useState } from 'react';

import { useScreen } from 'usehooks-ts';

import { Typography } from '@/shared/typography';
import { SearchForm } from '@/shared/ui/search-form';
import { TabBar } from '@/shared/ui/tab-bar';
import { Wzhuh } from '@/widgets/wzhuh';

import { IHero } from './Hero.types';
import 'react-calendar/dist/Calendar.css';

const tabs = ['Туры', 'Отели'];
const tabsSvg: (
  | 'airplane'
  | 'sofa'
  | 'image'
  | 'entertainment'
  | 'bus'
  | 'icon_document'
  | 'icon_video'
  | 'trash-light'
  | 'plant'
  | 'tennis-racket'
  | 'sort'
  | 'arrow-pointer'
  | 'bell'
  | 'calendar'
  | 'heart-outline'
)[] = ['airplane', 'sofa'];

export function Hero({ className }: IHero) {
  const [tabClick, setTabClick] = useState<string>('Туры');
  const windowWidth = useScreen();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handelTab(tab: string): void {
    setTabClick(tab);
  }

  if (!isClient) return null;

  return (
    <section
      className={`${className ?? ''} container relative rounded-bl-[20px] rounded-br-[20px] bg-blue-600 md:mb-20 xl:rounded-bl-[100px] xl:rounded-br-[100px]`}
      style={{
        backgroundImage: `url('/plain.svg')`,
        backgroundSize: '38%',
        backgroundPosition: '1% 50% ',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex flex-col items-center pt-20'>
        <Typography
          variant='h1'
          children='Легко найти — выгодно забронировать'
          className={`text-center text-white ${windowWidth && windowWidth.width < 1280 ? 'font-semibold' : 'font-bold'} `}
        />
        <Typography
          variant='subtitle3'
          children='Поиск туров и отелей по всему миру'
          className={`font-normal text-white ${windowWidth && windowWidth.width < 1280 && 'text-base'} m-[0 auto] mb-8`}
        />
        <TabBar
          tabs={tabs}
          svgTab={tabsSvg}
          getTabName={handelTab}
          className='mb-3 border border-solid border-white bg-transparent pb-0 pl-0 pr-0 pt-0 text-white'
        />
        <div className='w-full'>
          <SearchForm tabClick={tabClick} className={'mb-[40px] xl:mb-[300px]'} />
        </div>
      </div>
      <Wzhuh className='absolute left-1/2 top-2/3 hidden w-3/4 -translate-x-1/2 xl:flex' />
    </section>
  );
}
