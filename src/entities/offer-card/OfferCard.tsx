'use client';

import React from 'react';

import { nanoid } from 'nanoid';
import Link from 'next/link';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { calculateNights } from '@/shared/utils/calculateNights';
import { formatDateRange } from '@/shared/utils/formatDateRange';
import { formatDistance } from '@/shared/utils/formatDistance';
// import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';
import { getOfferUrl } from '@/shared/utils/getOfferUrl';
import { IHotelMiniData } from '@/types/hotel';
import { ITourMiniData } from '@/types/tour';

import { IOfferCard } from './OfferCard.types';

function isHotel(offer: IHotelMiniData | ITourMiniData): offer is IHotelMiniData {
  return (offer as IHotelMiniData).distance_to_the_center !== undefined;
}

function isTour(offer: IHotelMiniData | ITourMiniData): offer is ITourMiniData {
  return (offer as ITourMiniData).start_date !== undefined;
}

export function OfferCard({ offer, needHotelBadges }: IOfferCard) {
  const stars = Array.from({ length: offer.star_category }, (_, index) => index + 1);

  const tourBadges = isTour(offer)
    ? [`${formatDateRange(offer.start_date, offer.end_date)}`, '2 взрослых']
    : [];
  const hotelBadges = isTour(offer) ? [] : offer.amenities_common;
  const displayBadges = isTour(offer) ? tourBadges : hotelBadges;

  // const displayPrice = formatNumberToPriceInRub(offer.discountedPrice);

  return (
    <article className='relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-lg md:min-h-[482px]'>
      <div
        className={`absolute left-0 top-4 flex w-full items-center px-4 md:top-5 md:px-5 ${isTour(offer) ? 'justify-between' : 'justify-end'}`}
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
          src={offer.photo[0].photo}
          alt='Фото отеля'
          className='h-[199px] w-full bg-cover object-cover md:h-[278px] lg:h-[298px]'
        />
      </div>

      <Link
        href={getOfferUrl(offer)}
        className={`relative mt-[-20px] flex flex-1 ${isHotel(offer) ? 'min-h-[172px] px-4 py-4 md:min-h-[253px] md:pb-[22px] lg:min-h-[263px]' : 'min-h-[202px] px-5 py-5 md:min-h-[222px] lg:min-h-[229px]'} w-full flex-col justify-between rounded-t-[20px] bg-white md:mt-[-18px] md:px-5 md:py-5`}
      >
        <div className='flex items-center justify-between md:mb-[2px]'>
          <div className='flex gap-2'>
            <SvgSprite name='location' width={24} />
            <Typography variant='m-bold' className='font-semibold md:font-medium'>
              {offer.city + ', ' + offer.country}
            </Typography>
          </div>
          <div className='flex h-[38px] w-11 items-center justify-center rounded-lg bg-green-300 md:h-10 md:w-11'>
            <Typography variant='m-bold' className='font-semibold'>
              {offer.user_rating}
            </Typography>
          </div>
        </div>
        <div>
          <div className='mb-[-6px] flex'>
            {stars.map((star) => (
              <SvgSprite key={star} name='star-full' width={16} color='#3440CE' />
            ))}
          </div>
          <Typography variant='l-bold' className='font-semibold md:text-2xl'>
            {offer.name}
          </Typography>
        </div>
        {isHotel(offer) && (
          <div className='flex flex-col text-grey-600'>
            {offer.distance_to_the_center && (
              <Typography>
                {`${formatDistance(offer.distance_to_the_center)} от центра`}
              </Typography>
            )}
            {offer.distance_to_the_sea && (
              <Typography className='mt-[-7px]'>
                {`${formatDistance(offer.distance_to_the_sea)} от моря`}
              </Typography>
            )}
          </div>
        )}
        <div
          className={`mt-auto flex items-center ${isTour(offer) ? 'mb-[10px] gap-2 md:mb-[14px] lg:mb-[18px]' : 'mb-[9px] gap-1 md:mb-[11px] lg:mb-[13px]'}`}
        >
          {/* <Typography
            variant='l-bold'
            className={`font-semibold text-red-primary-800 md:text-xl`}
          >
            от {displayPrice}
          </Typography> */}
          {/* {offer.discount && (
            <Typography className='text-sm text-grey-300 md:text-[18px] md:font-medium'>
              <s>{formatNumberToPriceInRub(offer.original_price)}</s>
            </Typography>
          )} */}
          <Typography className='text-grey-600'>
            {isHotel(offer)
              ? 'за сутки'
              : `за ${calculateNights(offer.start_date, offer.end_date)} ночей`}
          </Typography>
        </div>
        {(isTour(offer) || (isHotel(offer) && needHotelBadges)) && (
          <ul
            className={`hide-scroll flex gap-4 overflow-x-auto md:justify-normal md:gap-4`}
          >
            {displayBadges.map((badge: string) => (
              <li
                className='rounded-xl bg-blue-200 px-3 py-1 text-blue-900'
                key={nanoid()}
              >
                <Typography>{badge}</Typography>
              </li>
            ))}
          </ul>
        )}
      </Link>
    </article>
  );
}
