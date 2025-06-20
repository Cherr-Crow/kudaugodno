'use client';

import React from 'react';

import { nanoid } from 'nanoid';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { calculateNights } from '@/shared/utils/calculateNights';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';

import { IOfferCard } from './OfferCard.types';
import { IHotelMiniData, ITourMiniData } from './OfferCard.types';

function isHotel(offer: IHotelMiniData | ITourMiniData): offer is IHotelMiniData {
  return (offer as IHotelMiniData).distance_to_the_center !== undefined;
}

function isTour(offer: IHotelMiniData | ITourMiniData): offer is ITourMiniData {
  return (offer as ITourMiniData).start_date !== undefined;
}

export function OfferCard({ offer, needHotelBadges }: IOfferCard) {
  const stars = Array.from({ length: offer.star_category }, (_, index) => index + 1);

  const tourBadges = ['24 – 30 октября', '2 взрослых'];
  const hotelBadges = ['Wi-Fi', 'Вид на море', 'Парковка'];
  const displayBadges = isTour(offer) ? tourBadges : hotelBadges;

  const displayPrice =
    isTour(offer) && offer.discount
      ? offer.discount < 1
        ? formatNumberToPriceInRub(offer.min_price * (1 - offer.discount))
        : formatNumberToPriceInRub(offer.min_price - offer.discount)
      : formatNumberToPriceInRub(offer.min_price);

  return (
    <article className='relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-lg md:min-h-[492px]'>
      <div
        className={`absolute left-0 top-4 flex w-full items-center ${isTour(offer) ? 'justify-between' : 'justify-end'} px-4`}
      >
        {isTour(offer) && (
          <div className='lg: rounded-[20px] bg-blue-50 px-[18px] py-2 md:px-[14px] md:py-3'>
            <Typography>Цена с перелетом</Typography>
          </div>
        )}
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 opacity-80'>
          <SvgSprite name='heart-outline' width={20} height={20} />
        </div>
      </div>
      <div className=''>
        <img
          src={offer.photo}
          alt='Фото отеля'
          className='min-h-[212px] w-full bg-cover object-cover md:min-h-[310px]'
        />
      </div>

      <div
        className={`relative mt-[-20px] flex ${isHotel(offer) ? 'min-h-[172px] md:min-h-[262px]' : 'min-h-[188px] md:min-h-[200px]'} w-full flex-1 flex-col rounded-t-[20px] bg-white px-4 pb-6 pt-4 md:mt-[-18px] md:px-5 md:pb-5 md:pt-6`}
      >
        <div className='mb-[-4px] flex items-center justify-between'>
          <div className='flex gap-2'>
            <SvgSprite name='location' width={24} />
            <Typography variant='m-bold' className='font-semibold md:font-medium'>
              {offer.city + ', ' + offer.country}
            </Typography>
          </div>
          <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-green-300 md:h-10 md:w-11'>
            <Typography variant='m-bold' className='font-semibold'>
              {offer.user_rating}
            </Typography>
          </div>
        </div>
        <div>
          <div className='mb-[-4px] flex'>
            {stars.map((star) => (
              <SvgSprite key={star} name='star-full' width={16} color='#3440CE' />
            ))}
          </div>
          <Typography variant='m-bold' className='font-semibold md:text-2xl'>
            {offer.name}
          </Typography>
        </div>
        {isHotel(offer) && (
          <div className='flex flex-col'>
            <Typography className='text-grey-600'>
              {`${offer.distance_to_the_center} км от центра`}
            </Typography>
            {offer.distance_to_the_sea && (
              <Typography className='mt-[-7px] text-grey-600'>
                {`${offer?.distance_to_the_sea} км от моря`}
              </Typography>
            )}
          </div>
        )}
        <div
          className={`mt-auto flex items-center ${isTour(offer) ? 'mb-2 justify-between md:justify-normal md:gap-2' : 'gap-1'} md:mb-5`}
        >
          <Typography
            variant='m-bold'
            className={`${isTour(offer) ? 'text-red-primary-800' : 'text-blue-600'} font-semibold md:text-xl`}
          >
            от {displayPrice}
          </Typography>
          {isTour(offer) && offer.discount && (
            <Typography className='text-sm text-grey-300 md:text-[18px] md:font-medium'>
              <s>{formatNumberToPriceInRub(offer.min_price)}</s>
            </Typography>
          )}
          <Typography className='text-grey-600'>
            {isHotel(offer)
              ? 'за сутки'
              : `за ${calculateNights(offer.start_date, offer.end_date)} ночей`}
          </Typography>
        </div>
        {(isTour(offer) || (isHotel(offer) && needHotelBadges)) && (
          <ul
            className={` ${needHotelBadges ? 'hidden md:flex' : 'flex justify-between'} md:justify-normal md:gap-4`}
          >
            {displayBadges.map((badge: string) => (
              <li className='rounded-xl bg-blue-200 px-3 py-1' key={nanoid()}>
                <Typography>{badge}</Typography>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
