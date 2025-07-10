'use client';

import React, { useEffect, useState } from 'react';

import { useScreen } from 'usehooks-ts';

import { BackgroundOverlay } from '@/shared/ui/background-overlay';
import { SearchBlock } from '@/shared/ui/search-block';
import { Typography } from '@/shared/ui/typography';
import { getDateNow } from '@/shared/utils/getDateNow';
import { useSearchBlockState } from '@/shared/utils/useSearchBlockState';

import { IHero } from './Hero.types';
import { WzhuhBanner } from '../wzhuh';

export function Hero({ className }: IHero) {
  const windowWidth = useScreen();
  const [isClient, setIsClient] = useState(false);
  const [tab, setTab] = useState<'Туры' | 'Отели'>('Туры');

  const searchState = useSearchBlockState({
    defaultDepartureCity: 'Москва',
    defaultWhere: 'Турция',
    defaultCheckInDate: `${getDateNow(+5)}`,
    defaultNights: '7 ночей',
    defaultGuests: '2 гостя',
    defaultType: 'Туры',
  });
  const { ...searchProps } = searchState;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className={`${className ?? ''} relative h-[100%] pb-10 md:mb-20`}>
      <BackgroundOverlay
        className={`h-[100%] bg-[url('/plain.svg')] bg-no-repeat md:h-[81.5%] lg:h-[87.5%] lg:bg-[position:30px_80px]`}
      />
      <div className='relative md:container'>
        <div className='flex flex-col items-center gap-[9px] pt-[40px] md:gap-4 md:pt-[88px] lg:pt-[91px] xl:gap-1 xl:pt-[79px]'>
          <Typography
            variant='h1'
            className={`text-center tracking-widest text-white md:text-[40px] md:tracking-wider lg:text-[60px] lg:tracking-wide ${windowWidth && windowWidth.width < 1280 ? 'font-semibold' : 'font-bold'} `}
          >
            Легко найти — выгодно забронировать
          </Typography>
          <Typography
            variant='subtitle3'
            className={`font-normal text-white md:text-[24px] lg:text-[32px] ${windowWidth && windowWidth.width < 1280 && 'text-base'} mb-4 md:mb-10 lg:mb-3 xl:mb-6`}
          >
            Поиск туров и отелей по всему миру
          </Typography>

          <SearchBlock tab={tab} setTab={setTab} {...searchProps} />
        </div>
        <WzhuhBanner className='mt-[64px] hidden md:flex lg:mt-[91px]' />
      </div>
    </section>
  );
}
