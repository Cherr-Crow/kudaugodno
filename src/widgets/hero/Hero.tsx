'use client';

import React, { useEffect, useState } from 'react';

import { useScreen } from 'usehooks-ts';

import { Typography } from '@/shared/typography';
import { SearchBlock } from '@/shared/ui/search-block';

import { IHero } from './Hero.types';

export function Hero({ className }: IHero) {
  const windowWidth = useScreen();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section
      className={`${className ?? ''} rounded-bl-[20px] rounded-br-[20px] bg-blue-600 pb-5 md:mb-20 xl:rounded-bl-[100px] xl:rounded-br-[100px]`}
      style={{
        backgroundImage: `url('/plain.svg')`,
        backgroundSize: '38%',
        backgroundPosition: '1% 50% ',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
        {/*<Wzhuh className='absolute left-1/2 top-2/3 hidden w-3/4 -translate-x-1/2 xl:flex' />*/}
      </div>
    </section>
  );
}
