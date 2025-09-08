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

import { IHotelCatalogCard } from './HotelCatalogCard.types';

export function HotelCatalogCard({ hotel }: IHotelCatalogCard) {
  const hotelFullData = useGetOneHotelQuery(hotel.id).data;
  const router = useRouter();

  const handleRouting = ({
    hotelId,
    hotelName,
    hotelCountry,
    tab,
  }: {
    hotelId?: number | null;
    tourId?: number | null;
    hotelName: string;
    hotelCountry: string;
    tab: string;
  }) => {
    const encodedName = encodeURIComponent(hotelName);
    const encodedHotelId = hotelId ? encodeURIComponent(hotelId) : null;
    const encodedCountry = encodeURIComponent(hotelCountry);
    const encodedType = encodeURIComponent(tab);

    if (tab === 'Отели' && encodedHotelId) {
      router.push(
        `/hotel-page?type=${encodedType}&hotelId=${encodedHotelId}&hotelName=${encodedName}&arrivalCountry=${encodedCountry}`,
      );
    }
  };
  const distances = getNearestDistances(hotel); // получаем дистанцию
  return (
    <li className='hotel-card relative flex flex-col justify-between rounded-3xl bg-white text-blue-950 shadow-xl md:h-[246px] md:flex-row lg:h-[260px]'>
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
            hotelId: hotel.id,
            hotelName: hotel.name,
            hotelCountry: hotel.country,
            tab: 'Отели',
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

          <div className='absolute right-0 top-[4px] flex flex-col-reverse gap-0 md:right-0 md:top-[4px] md:flex-row md:gap-3 lg:gap-[10px]'>
            <div className='self-center'>
              <Typography
                variant='s'
                className='text-[13px] text-blue-700 md:text-[16px]'
              >
                23 отзыва
              </Typography>
            </div>
            <Typography className='self-end rounded-lg bg-green-300 px-[10px] py-[7px] text-[16px] font-bold text-grey-950 md:self-center md:px-[11px] md:py-[13px] md:text-sm lg:px-[11px] lg:py-[10px]'>
              {hotel.user_rating}
            </Typography>
            <button className='hidden rounded-full bg-blue-50 px-4 py-3 md:flex md:px-[14px]'>
              <SvgSprite name='heart-outline' width={20} className='text-blue-700' />
            </button>
          </div>
        </div>

        {/* Название и город */}
        <div className='relative -mt-1 flex flex-col flex-wrap md:mb-[6px] lg:mb-[10px]'>
          <Typography
            variant='s'
            className='leading-1 text-[16px] font-[600] md:mb-2 md:text-[18px] lg:mb-[12px]'
          >
            {hotel.name}
          </Typography>
          <Typography variant='s' className='flex text-xs md:text-[16px]'>
            {hotel.city}
          </Typography>
          {/* Расстояния от отеля*/}
          <div>
            <Typography className='flex flex-col text-grey-600'>
              {distances.firstDistance}
            </Typography>
            <Typography className='flex flex-col text-grey-600'>
              {distances.secondDistance}
            </Typography>
          </div>
        </div>
        {/* Удобства */}
        <div className='hotel-amenities mb-[12px] flex gap-2 md:mb-[16px] md:flex-nowrap lg:mb-[16px]'>
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

        {/* Футер карточки отеля */}
        <div className='hotel-price-block mb-[16px] flex items-center justify-between rounded-xl bg-blue-50 px-[14px] py-[5px] md:px-[18px] md:py-[3px]'>
          {/* Блок с ценой */}
          <div className='mt-1 flex flex-col items-center gap-1 md:w-full md:flex-row md:justify-between'>
            {/* Даты */}
            <div className='flex flex-row justify-between'>
              <Typography
                variant='s'
                className='text-[14px] leading-[1] text-grey-950 md:text-[16px] lg:flex'
              >
                {hotelFullData?.rooms?.[0]?.calendar_dates?.[0]?.start_date
                  .split('-')
                  .reverse()
                  .slice(0, 2)
                  .join('.')}
              </Typography>
              <Typography
                variant='s'
                className='text-[14px] leading-[1] text-grey-950 md:text-[16px] lg:flex'
              >
                &thinsp;{`–`}&thinsp;
              </Typography>
              <Typography
                variant='s'
                className='text-[14px] leading-[1] text-grey-950 md:text-[16px] lg:flex'
              >
                {hotelFullData?.rooms?.[0]?.calendar_dates?.[0]?.end_date
                  .split('-')
                  .reverse()
                  .slice(0, 2)
                  .join('.')}
              </Typography>
            </div>

            <div className='flex flex-row gap-1'>
              <Typography
                variant='s'
                className='text-xs leading-[1] tracking-tighter text-grey-950 md:text-[16px]'
              >
                {hotelFullData?.rooms?.[0]?.calendar_dates?.[0]?.start_date &&
                hotelFullData?.rooms?.[0]?.calendar_dates?.[0]?.end_date
                  ? `${calculateNights(
                      hotelFullData.rooms[0].calendar_dates[0].start_date,
                      hotelFullData.rooms[0].calendar_dates[0].end_date,
                    )} ночи`
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
                {formatNumberToPriceInRub(
                  Number(hotelFullData?.rooms[0].calendar_dates?.[0]?.price),
                )
                  ? `от ${formatNumberToPriceInRub(
                      Number(hotelFullData?.rooms[0].calendar_dates[0]?.price),
                    )}`
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
              {formatNumberToPriceInRub(
                Number(hotelFullData?.rooms[0].calendar_dates?.[0]?.price),
              )
                ? `от ${formatNumberToPriceInRub(
                    Number(hotelFullData?.rooms[0].calendar_dates[0]?.price),
                  )}`
                : 'Цена не указана'}
            </Typography>
          </div>
        </div>
      </div>
    </li>
  );
}
