'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useScreen } from 'usehooks-ts';

import { OfferCard } from '@/entities/offer-card';
import { useGetAllDiscountsQuery } from '@/servicesApi/discountApi';
import { useGetToursQuery } from '@/servicesApi/toursApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { mapTourToMiniData } from '@/shared/utils/mapTourToMiniData';

export default function StocksToursPage() {
  const searchParams = useSearchParams();
  const country = searchParams.get('country');

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

  const { data: toursData } = useGetToursQuery({});
  const { data: discounts } = useGetAllDiscountsQuery();

  const discountMap = Object.fromEntries((discounts ?? []).map((d) => [d.id, d]));

  const enrichedTours = (toursData?.results ?? [])
    .map((tour) => {
      const discount = discountMap[tour.id];
      const amount = discount?.active_stock
        ? Number(discount.discount_amount)
        : null;
      return mapTourToMiniData(tour, amount);
    })
    .filter((t) => {
      if (t.discount === null) return false;
      if (!country) return true;

      return (
        t.arrival_country.toLowerCase() === decodeURIComponent(country).toLowerCase()
      );
    });

  const visibleTours = enrichedTours.slice(0, cardsToShow);

  const hasMore = cardsToShow < enrichedTours.length;

  return (
    <div className='mx-auto max-w-[1440px]'>
      <div className='px-4 pt-[26px] md:px-20 md:pt-0 lg:px-[130px]'>
        <Breadcrumbs
          className='hidden md:visible md:mb-3 md:flex lg:mb-1'
          paths={[
            { label: 'Акции', href: '/stocks' },
            {
              label: country
                ? `Туры по специальной цене - ${country}`
                : 'Туры по специальной цене',
            },
          ]}
        />
        <div className='mb-3 flex md:mb-6 lg:mb-8'>
          <Link href='/stocks/' className='mx-2 flex items-center md:hidden'>
            <SvgSprite name='arrow' className='rotate-180' />
          </Link>
          <Typography variant='h1' className='text-blue-950 md:text-5xl lg:text-7xl'>
            {country
              ? `Туры по специальной цене - ${country}`
              : 'Туры по специальной цене'}
          </Typography>
        </div>

        <ul
          className={`${hasMore ? '' : 'pb-10 md:pb-20'} grid grid-cols-1 gap-3 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3`}
        >
          {visibleTours.map((tour) => (
            <li key={tour.id}>
              <OfferCard offer={tour} />
            </li>
          ))}
        </ul>
        {hasMore && (
          <div className='mt-8 flex items-center justify-center pb-10 md:pb-20'>
            <ButtonCustom
              variant='tetriary'
              size='m'
              type='button'
              className='mt-2 xl:mt-0'
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
