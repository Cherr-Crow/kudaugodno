'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useScreen } from 'usehooks-ts';

import { OfferCard } from '@/entities/offer-card';
import { useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { IHotelMiniData } from '@/types/hotel';

export default function StocksHotelsPage() {
  const screen = useScreen();
  const [cardsToShow, setCardsToShow] = useState(4);

  const initialCount = useMemo(() => {
    if (!screen?.width) return 6;
    if (screen.width >= 1380) return 21;
    if (screen.width >= 840) return 12;
    return 6;
  }, [screen]);

  useEffect(() => {
    setCardsToShow(initialCount);
  }, [initialCount]);

  const increment = initialCount;

  const { data: hotelsData } = useGetHotelsQuery({});
  const enrichedHotels: IHotelMiniData[] = hotelsData?.results ?? [];

  const visible = enrichedHotels.slice(0, cardsToShow);

  const hasMore = cardsToShow < enrichedHotels.length;
  return (
    <div className='mx-auto max-w-[1440px]'>
      <div className='px-4 pt-[26px] md:px-20 md:pt-0 lg:px-[130px]'>
        <Breadcrumbs
          className='hidden md:visible md:mb-3 md:flex lg:mb-1'
          paths={[
            { label: 'Акции', href: '/stocks' },
            {
              label: 'Отели по специальной цене',
            },
          ]}
        />
        <div className='mb-3 flex md:mb-6 lg:mb-8'>
          <Link href='/stocks/' className='mx-2 flex items-center md:hidden'>
            <SvgSprite name='arrow' className='rotate-180' />
          </Link>
          <Typography variant='h1' className='text-blue-950 md:text-5xl lg:text-7xl'>
            Отели по специальной цене
          </Typography>
        </div>

        <ul
          className={`${hasMore ? '' : 'pb-10 md:pb-20'} grid grid-cols-1 gap-3 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3`}
        >
          {visible.map((hotel) => (
            <li key={hotel.id}>
              <OfferCard offer={hotel} />
            </li>
          ))}
        </ul>
        {hasMore && (
          <div className='mt-4 flex items-center justify-center pb-10 md:mt-7 md:pb-20 lg:mt-9'>
            <ButtonCustom
              variant='tetriary'
              size='s'
              type='button'
              className='md:py-[14px] lg:px-14 lg:py-6'
              style={{ gridArea: 'btnSubmit' }}
              onClick={() => setCardsToShow((prev) => prev + increment)}
            >
              <Typography variant='l-bold'>Показать ещё</Typography>
            </ButtonCustom>
          </div>
        )}
      </div>
    </div>
  );
}
