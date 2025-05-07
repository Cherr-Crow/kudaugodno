'use client';

import React, { useEffect, useState } from 'react';

import { useScreen } from 'usehooks-ts';

import { SearchBlock } from '@/shared/ui/search-block';
import { Typography } from '@/shared/ui/typography';

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
            className={`text-center text-white ${windowWidth && windowWidth.width < 1280 ? 'font-semibold' : 'font-bold'} `}
          >
            Легко найти — выгодно забронировать
          </Typography>
          <Typography
            variant='subtitle3'
            className={`font-normal text-white ${windowWidth && windowWidth.width < 1280 && 'text-base'} m-[0 auto] mb-8`}
          >
            Поиск туров и отелей по всему миру
          </Typography>

          <SearchBlock />
        </div>
        <Wzhuh className='mt-20 hidden md:flex' />
      </div>
    </section>
  );
}
