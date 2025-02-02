'use client';

import React, { useEffect, useState } from 'react';

import { useScreen } from 'usehooks-ts';

import { Typography } from '@/shared/typography';
import { SearchBlock } from '@/shared/ui/search-block';

import { IHero } from './Hero.types';
import { Wzhuh } from '../wzhuh';

export function Hero({ className }: IHero) {
  const windowWidth = useScreen();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className={`${className ?? ''} relative pb-5 md:mb-20`}>
      <div
        className={`absolute left-0 top-0 h-full w-full rounded-bl-[20px] rounded-br-[20px] bg-blue-600 bg-[url("/plain.svg")] bg-no-repeat md:h-[90%] md:rounded-bl-[100px] md:rounded-br-[100px]`}
      ></div>
      <div className='container relative'>
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

          <SearchBlock />
        </div>
        <Wzhuh className='mt-20 hidden md:flex' />
      </div>
    </section>
  );
}
