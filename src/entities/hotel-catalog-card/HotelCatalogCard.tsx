'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { HotelComponentPhotoSlider } from '@/shared/hotel-component-photo-slider';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IHotelCatalogCard } from './HotelCatalogCard.types';

export function HotelCatalogCard({ hotel }: IHotelCatalogCard) {
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

  return (
    <li className='hotel-card relative flex flex-col rounded-lg bg-white text-blue-950 shadow-xl md:flex-row'>
      <div className='hotel-image relative z-0 mb-4 w-full overflow-hidden md:mb-0 md:mr-4 md:w-2/5'>
        <button className='absolute right-2 top-2 z-10 rounded-full bg-blue-50 p-3 lg:hidden'>
          <SvgSprite name='heart-outline' width={15} />
        </button>
        <HotelComponentPhotoSlider photos={hotel.photo} />
      </div>

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
        className='hotel-info relative z-10 w-full rounded-lg p-4 md:ml-[-16px] md:w-3/5'
      >
        {/* Рейтинг и информация */}
        <div className='mb-2 flex gap-2'>
          <Rating category={hotel.star_category} starSize={16} gap={1} />

          <div className='flex items-center gap-2'>
            <Typography
              variant='l'
              className='rounded-lg bg-green-300 px-2 py-2 text-[16px] font-medium text-grey-950 md:px-3 md:py-2 md:text-sm'
            >
              {hotel.user_rating}
            </Typography>
            <button className='hidden rounded-full bg-blue-50 p-3 lg:flex'>
              <SvgSprite name='heart-outline' width={30} />
            </button>
          </div>
        </div>

        <div className='relative mb-2 flex flex-col flex-wrap gap-2'>
          <Typography variant='h4' className='mb-2 text-[16px] md:text-lg'>
            {hotel.name}
          </Typography>
          <Typography variant='l' className='mb-2 text-xs md:text-sm'>
            {hotel.city}
          </Typography>
        </div>

        {/* Удобства */}
        <div className='hotel-amenities mb-2 flex flex-nowrap gap-2'>
          {hotel.amenities_common.slice(0, 3).map((amenity, amenityIndex) => (
            <Typography
              key={`amenity-${amenityIndex}`}
              variant='l-bold'
              className='rounded-xl bg-blue-50 px-2 py-1 text-xs md:text-lg'
            >
              {amenity}
            </Typography>
          ))}
        </div>

        {/* Цена */}
        <div className='hotel-price flex items-center justify-between rounded-xl bg-blue-50 p-2'>
          <Typography variant='h4' className='text-[16px] text-blue-600 md:text-lg'>
            {`${hotel.min_price_with_discount} ₽`}
          </Typography>
        </div>
      </div>
    </li>
  );
}
