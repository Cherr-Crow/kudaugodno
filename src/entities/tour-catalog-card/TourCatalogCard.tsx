'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { HotelComponentPhotoSlider } from '@/shared/hotel-component-photo-slider';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { calculateNights } from '@/shared/utils/calculateNights';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';
import { getNearestDistances } from '@/shared/utils/getNearestDistance';

import { ITourCatalogCard } from './TourCatalogCard.types';

export function TourCatalogCard({ tour }: ITourCatalogCard) {
  const router = useRouter();
  const hotel = tour.hotel;
  const hotelFullData = useGetOneHotelQuery(hotel.id).data;
  const distances = getNearestDistances(tour);
  const handleRouting = ({
    tourId,
    hotelCountry,
    tab,
  }: {
    hotelId?: number | null;
    tourId?: number | null;
    hotelName: string;
    hotelCountry: string;
    tab: string;
  }) => {
    const encodedTourId = tourId ? encodeURIComponent(tourId) : null;
    const encodedCountry = encodeURIComponent(hotelCountry);
    const encodedType = encodeURIComponent(tab);

    if (tab === 'Туры' && encodedTourId) {
      router.push(
        `/tour-page?type=${encodedType}&tourId=${encodedTourId}&arrivalCountry=${encodedCountry}`,
      );
    }
  };

  return (
    <li className='hotel-card relative flex flex-col justify-between rounded-3xl bg-white text-blue-950 shadow-xl md:h-[330px] md:flex-row lg:h-[300px]'>
      {/* Фото */}
      <div className='hotel-image relative z-0 h-[188px] w-full overflow-hidden rounded-tl-3xl rounded-tr-3xl md:mb-0 md:mr-4 md:h-full md:w-[460px] md:rounded-3xl lg:mr-0 lg:w-[440px]'>
        <button className='absolute right-4 top-4 z-10 rounded-full bg-blue-50 px-4 py-3 md:hidden'>
          <SvgSprite name='heart-outline' className='text-blue-700' width={18} />
        </button>
        <HotelComponentPhotoSlider photos={hotel.photo} />
      </div>

      {/* Информация */}
      <div
        onClick={() => {
          handleRouting({
            tourId: tour.id,
            hotelId: hotel.id,
            hotelName: hotel.name,
            hotelCountry: hotel.country,
            tab: 'Туры',
          });
        }}
        style={{ cursor: 'pointer' }}
        className='hotel-info relative z-10 -mt-[20px] w-full rounded-3xl bg-white px-4 md:-ml-[50px] md:-mt-0 md:w-[60%] md:pl-6 md:pr-6 lg:pl-[24px]'
      >
        {/* Рейтинг */}
        <div className='relative mt-3 flex justify-between gap-2'>
          <div className='flex text-blue-700'>
            <Rating category={hotel.star_category} starSize={16} gap={1} />
          </div>

          <div className='absolute right-0 top-[4px] flex flex-col-reverse gap-0 md:-right-1 md:flex-row md:gap-[12px] lg:right-0 lg:gap-[12px]'>
            <div className='self-center'>
              <Typography
                variant='s'
                className='text-[13px] text-blue-700 md:text-[16px]'
              >
                23 отзыва
              </Typography>
            </div>
            <Typography className='self-end rounded-lg bg-green-300 px-[10px] py-[7px] text-[16px] font-bold text-grey-950 md:self-center md:px-[10px] md:py-[10px] md:text-sm lg:px-[11px] lg:py-[10px]'>
              {hotel.user_rating}
            </Typography>
            <button className='hidden rounded-full bg-blue-50 px-4 py-3 md:flex md:px-[14px]'>
              <SvgSprite name='heart-outline' width={20} className='text-blue-700' />
            </button>
          </div>
        </div>

        {/* Название и город */}
        <div className='relative -mt-1 flex flex-col flex-wrap md:-mt-0 md:mb-[10px] lg:mb-[10px]'>
          <Typography
            variant='s'
            className='leading-1 text-[16px] font-[600] md:mb-2 md:text-[18px] lg:mb-[8px]'
          >
            {hotel.name}
          </Typography>
          <Typography variant='s' className='flex text-xs md:text-[16px]'>
            {hotel.city}
          </Typography>
        </div>

        {/* Расстояния от отеля*/}
        <div>
          <Typography className='flex flex-col text-grey-600'>
            {distances.firstDistance}
          </Typography>
          <Typography className='flex flex-col text-grey-600'>
            {distances.secondDistance}
          </Typography>
        </div>

        {/* Удобства */}
        <div className='hotel-amenities mb-[12px] flex gap-2 md:mb-[21px] md:flex-nowrap lg:mb-[20px]'>
          {hotel.amenities_common.slice(0, 3).map((amenity, amenityIndex) => (
            <Typography
              key={`amenity-${amenityIndex}`}
              variant='l-bold'
              className='rounded-xl bg-green-50 px-2 py-[7px] text-xs text-grey-950 md:py-[11px] md:text-[16px] lg:py-[11px]'
            >
              {amenity}
            </Typography>
          ))}
        </div>

        {/* Туроператор и рейс */}
        <div className='mb-[8px] flex flex-col gap-0 md:mb-[13px] md:gap-1 lg:flex-row lg:justify-between lg:gap-11'>
          <div className='flex items-center gap-2 md:gap-3'>
            <SvgSprite name='airplane' width={20} className='md:-mt-3 md:w-[24px]' />
            <Typography
              variant='s'
              className='text-nowrap text-[14px] md:text-[16px] lg:leading-3'
            >
              Перелет входит в стоимость тура
            </Typography>
          </div>
          <div className='flex flex-row gap-2 md:gap-1 lg:items-center'>
            <Typography
              variant='xs'
              className='text-[12px] text-grey-600 md:text-[16px]'
            >
              Турагент:
            </Typography>
            <Typography
              variant='xs'
              className='text-[12px] text-blue-950 md:text-[16px] lg:leading-3'
            >
              {tour.tour_operator}
            </Typography>
          </div>
        </div>

        {/* Футер карточки тура */}
        <div className='hotel-price-block mb-[16px] flex items-center justify-between rounded-xl bg-blue-50 px-[14px] py-[5px] md:px-[18px] md:py-[3px]'>
          <div className='mt-1 flex flex-col items-center gap-1 md:w-full md:flex-row md:justify-between'>
            {/* Даты тура */}
            <div className='flex flex-row justify-between'>
              <Typography
                variant='s'
                className='text-[14px] leading-[1] text-grey-950 md:text-[16px]'
              >
                {tour.publish_start_date
                  ? tour.publish_start_date
                      .split('-')
                      .reverse()
                      .slice(0, 2)
                      .join('.')
                  : '—'}
              </Typography>
              <Typography
                variant='s'
                className='mx-1 text-[14px] leading-[1] text-grey-950 md:text-[16px]'
              >
                &thinsp;{`–`}&thinsp;
              </Typography>
              <Typography
                variant='s'
                className='text-[14px] leading-[1] text-grey-950 md:text-[16px]'
              >
                {tour.publish_end_date
                  ? tour.publish_end_date.split('-').reverse().slice(0, 2).join('.')
                  : '—'}
              </Typography>
            </div>

            {/* Ночи и гости */}
            <div className='flex flex-row gap-1'>
              <Typography
                variant='s'
                className='text-xs leading-[1] tracking-tighter text-grey-950 md:text-[16px]'
              >
                {tour.publish_start_date && tour.publish_end_date
                  ? `${calculateNights(tour.publish_start_date, tour.publish_end_date)} ночей`
                  : '—'}
              </Typography>
              <Typography
                variant='m'
                className='text-xs leading-[1] tracking-tighter text-grey-950 md:text-[16px]'
              >
                {hotelFullData?.rooms?.[0]?.number_of_adults} гостя
              </Typography>
            </div>

            {/* Цена (desktop) */}
            <div className='hidden md:flex'>
              <Typography
                variant='m'
                className='text-md text-nowrap font-[600] leading-[1] tracking-[-0.1em] text-blue-700 md:text-lg md:tracking-tighter'
              >
                {formatNumberToPriceInRub(Number(tour.total_price))
                  ? `от ${formatNumberToPriceInRub(Number(tour.total_price))}`
                  : 'Цена не указана'}
              </Typography>
            </div>
          </div>

          {/* Цена (mobile) */}
          <div className='mt-1 flex md:hidden'>
            <Typography
              variant='m'
              className='text-md text-nowrap font-[600] leading-[1] tracking-[-0.1em] text-blue-700 md:text-lg md:tracking-tighter'
            >
              {formatNumberToPriceInRub(Number(tour.total_price))
                ? `от ${formatNumberToPriceInRub(Number(tour.total_price))}`
                : 'Цена не указана'}
            </Typography>
          </div>
        </div>
      </div>
    </li>
  );
}
