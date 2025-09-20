'use client';

import React, { useMemo, useState } from 'react';

import Link from 'next/link';
import { useWindowSize } from 'usehooks-ts';

import { OfferCard } from '@/entities/offer-card';
import { PromoCardList } from '@/entities/promo-card/PromoCard';
import { IDiscount, useGetAllDiscountsQuery } from '@/servicesApi/discountApi';
import { useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { useGetToursQuery } from '@/servicesApi/toursApi';
import { SearchBlock } from '@/shared/ui/search-block';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';
import { mapTourToMiniData } from '@/shared/utils/mapTourToMiniData';
import type { EnrichedTourMini } from '@/shared/utils/mapTourToMiniData';
import { IHotelMiniData } from '@/types/hotel';

type EnrichedTour = EnrichedTourMini;

export default function Stocks() {
  const { width } = useWindowSize();
  const isDesktop = width >= 1380;
  const [showAllDeals, setShowAllDeals] = useState(false);

  const visibleCount = useMemo(() => {
    if (width >= 1380) return 8;
    if (width >= 840) return 6;
    return 4;
  }, [width]);

  const { data: toursData, isFetching: toursLoading } = useGetToursQuery({});
  const { data: hotelsData } = useGetHotelsQuery({});
  const tours = toursData?.results ?? [];

  const { data: discounts, isFetching: discountsLoading } =
    useGetAllDiscountsQuery();
  const discountMap = useMemo(() => {
    const map: Record<number, IDiscount> = {};
    discounts?.forEach((d) => {
      map[d.id] = d;
    });
    return map;
  }, [discounts]);

  const enrichedTours: EnrichedTour[] = useMemo(() => {
    if (!tours.length) return [];

    return tours
      .map((tour) => {
        const d = discountMap[tour.id];
        const raw = d?.active_stock ? Number(d.discount_amount) : null;
        return mapTourToMiniData(tour, raw);
      })
      .filter((t) => t.discount !== null);
  }, [tours, discountMap]);

  const toursToRender = useMemo(() => {
    const count = isDesktop ? 3 : 4;
    return enrichedTours.slice(0, count);
  }, [isDesktop, enrichedTours]);

  const enrichedHotels: IHotelMiniData[] = hotelsData?.results ?? [];

  const hotelsToRender = useMemo(() => {
    const count = isDesktop ? 3 : 4;
    return enrichedHotels.slice(0, count);
  }, [isDesktop, enrichedHotels]);

  const hotDeals = useMemo(() => {
    const map: Record<string, number> = {};
    enrichedTours.forEach((t) => {
      const prev = map[t.arrival_country];
      if (prev == null || t.discountedPrice < prev) {
        map[t.arrival_country] = t.discountedPrice;
      }
    });
    return Object.entries(map).map(([name, minPrice], i) => ({
      id: String(i),
      name,
      minPrice,
    }));
  }, [enrichedTours]);

  const displayedDeals = showAllDeals ? hotDeals : hotDeals.slice(0, visibleCount);
  const shouldToggle = hotDeals.length > visibleCount;
  const isLoading = toursLoading || discountsLoading;

  return (
    <div className='flex flex-col'>
      <section className="relative rounded-b-[20px] bg-blue-600 bg-[url('/bg-stock-page.png')] bg-cover bg-no-repeat md:rounded-b-[100px]">
        <div className='relative flex flex-col items-center px-4 pb-10 pt-10 md:pb-[51px] md:pl-[76px] md:pr-[84px] md:pt-5 lg:pb-[68px] lg:pt-[52px]'>
          <Typography
            variant='h1'
            className='mb-[10px] text-center text-4xl leading-[0.99] text-white md:mb-6 md:text-5xl md:leading-[1.1] lg:mb-10 lg:text-7xl lg:leading-[0.8]'
          >
            Все самые выгодные <br /> предложения <br className='md:hidden' /> в
            одном месте
          </Typography>
          <SearchBlock />
        </div>
      </section>
      <div className='conteiner lg:mx-auto lg:max-w-[1440px]'>
        <section className='px-4 pt-4 md:px-20 md:pt-[52px] lg:px-[130px]'>
          <div className='mb-[19px] flex items-center justify-between md:mb-7 lg:mb-9'>
            <Typography
              variant='l-bold'
              className='text-left tracking-wider text-blue-950 md:text-2xl md:font-bold lg:text-[32px] lg:font-semibold'
            >
              Найдите горящие туры в 40 странax
            </Typography>
            {width >= 768 && shouldToggle && (
              <button
                onClick={() => setShowAllDeals((v) => !v)}
                className='mr-3 inline-block flex text-blue-600 lg:mr-3'
              >
                <Typography
                  variant='m-bold'
                  className='mr-2 font-medium tracking-wider lg:mr-[10px] lg:text-xl'
                >
                  {showAllDeals ? 'Скрыть' : 'Смотреть все страны'}
                </Typography>
                <SvgSprite
                  name='arrow'
                  className={`transition-transform duration-300 ${showAllDeals ? '-rotate-90' : 'rotate-90'} self-center`}
                  width={24}
                  height={24}
                  strokeWidth={2}
                />
              </button>
            )}
          </div>

          <div className='grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-5 md:gap-y-3 lg:grid-cols-4'>
            {displayedDeals.map(({ id, name, minPrice }) => (
              <Link
                href={`/stocks/tours?country=${encodeURIComponent(name)}`}
                key={id}
                className='flex items-center justify-between rounded-[8px] bg-blue-50 px-5 py-3 text-blue-950 md:rounded-[12px] md:px-5 md:py-[10px] lg:py-3'
              >
                <Typography className='md:text-xl lg:text-2xl'>{name}</Typography>
                <Typography
                  variant='m-bold'
                  className='md:text-xl md:font-semibold lg:text-2xl lg:font-medium'
                >
                  от {formatNumberToPriceInRub(minPrice)}
                </Typography>
              </Link>
            ))}
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-slate-200 h-10 w-32 animate-pulse rounded-full'
                />
              ))}
          </div>
          {width < 768 && shouldToggle && (
            <div className='flex justify-end pt-7'>
              <button
                onClick={() => setShowAllDeals((v) => !v)}
                className='mr-3 inline-block flex text-blue-600'
              >
                <Typography variant='m-bold' className='mr-2 tracking-wider'>
                  {showAllDeals ? 'Скрыть' : 'Смотреть все страны'}
                </Typography>
                <SvgSprite
                  name='arrow'
                  className={`transition-transform duration-300 ${showAllDeals ? '-rotate-90' : 'rotate-90'} self-center`}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          )}
        </section>
        <section className='pt-[46px] md:px-20 md:pt-[40px] lg:px-[130px] lg:pt-[41px]'>
          <div className='mb-3 flex items-center justify-between md:mb-[22px] lg:mb-[31px]'>
            <Typography
              variant='l-bold'
              className='pl-4 tracking-wider text-blue-950 md:pl-0 md:text-2xl md:font-bold lg:text-[32px] lg:font-semibold'
            >
              Туры по специальной цене
            </Typography>
            <Link
              href='/stocks/tours'
              className='mr-1 flex items-center pr-4 text-blue-600 md:mr-[18px] md:pr-0'
            >
              <Typography
                variant='m-bold'
                className='hidden tracking-wider md:mr-4 md:inline md:text-lg md:font-medium lg:mr-5 lg:text-xl'
              >
                Смотреть больше
              </Typography>
              <SvgSprite name='arrow-pointer' width={14} />
            </Link>
          </div>
          <ul className='hide-scroll flex gap-3 overflow-x-auto md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-4 md:overflow-visible lg:grid-cols-3'>
            {toursToRender.map((tour) => (
              <li
                key={tour.id}
                className='mb-[18px] h-full min-h-[372px] min-w-[320px] first:ml-4 last:mr-4 md:m-0 md:first:ml-0 md:last:mr-0'
              >
                <OfferCard offer={tour} />
              </li>
            ))}
          </ul>
        </section>
        <section className='md:px-20 md:pt-[38px] lg:px-[130px]'>
          <div className='mb-[10px] flex items-center justify-between md:mb-[22px] lg:mb-[34px]'>
            <Typography
              variant='l-bold'
              className='pl-4 tracking-wider text-blue-950 md:pl-0 md:text-2xl md:font-bold lg:text-[32px] lg:font-semibold'
            >
              Отели по специальной цене
            </Typography>
            <Link
              href='/stocks/hotels'
              className='mr-1 flex items-center pr-4 text-blue-600 md:mr-[18px] md:pr-0'
            >
              <Typography
                variant='m-bold'
                className='hidden tracking-wider md:mr-4 md:inline md:text-lg md:font-medium lg:mr-5 lg:text-xl'
              >
                Смотреть больше
              </Typography>
              <SvgSprite name='arrow-pointer' width={14} />
            </Link>
          </div>
          <ul className='hide-scroll flex gap-3 overflow-x-auto md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-4 md:overflow-visible lg:grid-cols-3'>
            {hotelsToRender.map((hotel) => (
              <li
                key={hotel.id}
                className='mb-[21px] min-h-[372px] min-w-[343px] first:ml-4 last:mr-4 md:m-0 md:first:ml-0 md:last:mr-0'
              >
                <OfferCard offer={hotel} needHotelBadges={true} />
              </li>
            ))}
          </ul>
        </section>
        <section className='md:px-20 md:pb-[78px] md:pt-[38px] lg:mb-[65px] lg:px-[130px]'>
          <div className='mb-4 flex items-center justify-between md:mb-5 lg:mb-[34px]'>
            <Typography
              variant='l-bold'
              className='pl-4 tracking-wider text-blue-950 md:pl-0 md:text-2xl md:font-bold lg:text-[32px] lg:font-semibold'
            >
              Акции и спецпредложения
            </Typography>
            <Link
              href='/stocks/promos'
              className='mr-1 flex items-center pr-4 text-blue-600 md:mr-[18px] md:pr-0'
            >
              <Typography
                variant='m-bold'
                className='hidden tracking-wider md:mr-4 md:inline md:text-lg md:font-medium lg:mr-5 lg:text-xl'
              >
                Смотреть больше
              </Typography>
              <SvgSprite name='arrow-pointer' width={14} />
            </Link>
          </div>
          <PromoCardList />
        </section>
      </div>
    </div>
  );
}
