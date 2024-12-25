"use client";

import React, { useEffect, useState } from 'react';
import { IHero } from './Hero.types';
import { Typography } from '@/shared/typography';
import { TabBar } from '@/shared/ui/tab-bar';
import { SearchForm } from '@/shared/ui/search-form';

import 'react-calendar/dist/Calendar.css';
import '../../shared/ui/calendar/calendar_custom.css';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowWidth } from '@/app/rtk/slices/windowWidthSlice';


const tabs = ['Туры', 'Отели']
const tabsSvg: ("airplane" | "sofa" | "image" | "entertainment" | "bus" | "icon_document" | "icon_video" | "trash-light" | "plant" | "tennis-racket" | "sort" | "arrow-pointer" | "bell" | "calendar" | "heart-outline")[] = ['airplane', 'sofa'];

export function Hero({ className }: IHero) {
  const [tabClick, setTabClick] = useState<string>('Туры');
  const dispatch = useDispatch();
  const windowWidth = useSelector((state: { windowWidth: { value: number } }) => state.windowWidth.value);

  useEffect(() => {
    
      dispatch(setWindowWidth(window.innerWidth));
      const handleResize = () => {
        dispatch(setWindowWidth(window.innerWidth));
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    
  }, []);



  function handelTab(tab: string): void {
    setTabClick(tab);
  }

  return <section className={`${className} container bg-blue-600 rounded-bl-[20px] xl:rounded-bl-[100px] rounded-br-[20px] xl:rounded-br-[100px] `}
    style={{
      backgroundImage: `url('/plain.svg')`,
      backgroundSize: '38%',
      backgroundPosition: '1% 50% ',
      backgroundRepeat: 'no-repeat'
    }}>

    <div className='pt-20 flex flex-col items-center'>
      <Typography variant='h1' children='Легко найти — выгодно забронировать' className={`text-white text-center  ${ windowWidth < 1280 ? 'font-semibold text-3xl' : 'font-bold' } `} />
      <Typography variant='subtitle3' children='Поиск туров и отелей по всему миру' className={`text-white font-normal ${ windowWidth < 1280 && 'text-base' } m-[0 auto] mb-8`} />
      <TabBar tabs={tabs} svgTab={tabsSvg} getTabName={handelTab} className='bg-transparent border border-solid border-white pt-0 pb-0 pr-0 pl-0 text-white mb-3' />
      <div className='w-full'><SearchForm tabClick={tabClick} className={'mb-[40px] xl:mb-[313px]'} /></div>
    </div>
  </section>;
}
