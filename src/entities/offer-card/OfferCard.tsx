'use client';

import React from 'react';

import { nanoid } from 'nanoid';
import Link from 'next/link';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { calculateNights } from '@/shared/utils/calculateNights';
import { formatDateRange } from '@/shared/utils/formatDateRange';
import { formatDistance } from '@/shared/utils/formatDistance';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';
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

export function OfferCard({ offer }: IOfferCard) {
  const stars = Array.from({ length: offer.star_category }, (_, index) => index + 1);

  const tourBadges = isTour(offer)
    ? [`${formatDateRange(offer.start_date, offer.end_date)}`, '2 взрослых']
    : [];

  const hotelBadges = isTour(offer)
    ? []
    : (offer.amenities_common || ['WI-FI', 'Вид на море ', 'Парковка']).slice(0, 3); // Fallback значения

  const displayBadges = isTour(offer) ? tourBadges : hotelBadges;

  // Получаем цены
  const currentPrice = isHotel(offer)
    ? Number(offer.min_price_with_discount) || 0
    : offer.discountedPrice || 0;

  const originalPrice = isHotel(offer)
    ? Number(offer.min_price_without_discount) || currentPrice
    : offer.original_price || currentPrice;

  const hasDiscount = originalPrice > currentPrice && currentPrice > 0;
  const displayPrice = formatNumberToPriceInRub(currentPrice);
  const displayOriginalPrice = formatNumberToPriceInRub(originalPrice);

  return (
    <article className='relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-lg md:max-h-[478px] lg:max-h-[510px]'>
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
        className={`relative mt-[-20px] flex flex-1 ${isHotel(offer) ? 'min-h-[172px] md:min-h-[253px] md:pb-[22px] lg:min-h-[263px]' : 'min-h-[202px] md:min-h-[222px] lg:min-h-[229px]'} w-full flex-col rounded-t-[20px] bg-white md:mt-[-18px]`}
      >
        <div
          className={`flex items-center justify-between ${isHotel(offer) ? 'px-4 pt-4' : 'px-5 pt-5'} md:px-5 md:pt-5`}
        >
          <div className='flex gap-2'>
            <SvgSprite name='location' width={24} />
            <Typography variant='m-bold' className='font-semibold md:font-medium'>
              {offer.city + ', ' + offer.country}
            </Typography>
          </div>
          <div className='flex h-[28px] w-10 items-center justify-center rounded-lg bg-green-300 md:h-[36px] md:w-11'>
            <Typography variant='m-bold' className='font-semibold'>
              {offer.user_rating}
            </Typography>
          </div>
        </div>
        <div>
          <div
            className={`mt-[3px] flex h-[16px] md:mt-[3px] lg:mb-[-5px] lg:h-[24px] ${isHotel(offer) ? 'px-4' : 'px-5'} md:px-5`}
          >
            {stars.map((star) => (
              <SvgSprite key={star} name='star-full' width={16} color='#3440CE' />
            ))}
          </div>
          <Typography
            variant='l-bold'
            className={`font-semibold md:text-2xl lg:leading-[29px] ${isHotel(offer) ? 'px-4' : 'px-5'} md:px-5`}
          >
            {offer.name}
          </Typography>
        </div>
        {isHotel(offer) && (
          <div
            className={`flex flex-col text-grey-600 ${isHotel(offer) ? 'px-4' : 'px-5'} md:px-5`}
          >
            {offer.distance_to_the_center && (
              <Typography className='leading-[22px]'>
                {`${formatDistance(offer.distance_to_the_center)} от центра`}
              </Typography>
            )}
          </div>
        )}
        <div
          className={`flex items-center md:mt-[4px] lg:mt-[10px] ${isTour(offer) ? 'mb-[10px] gap-3 px-5 md:mb-[14px] lg:mb-[18px]' : 'mt-[2px] gap-[12px] px-4 md:gap-[4px] lg:gap-[2px]'} md:px-5`}
        >
          <>
            <Typography
              variant='l-bold'
              className={`font-semibold ${hasDiscount ? 'text-red-primary-800' : 'text-blue-600'} md:text-xl`}
            >
              от {displayPrice}
            </Typography>

            {hasDiscount && (
              <Typography className='mt-[3px] text-sm text-grey-300 md:text-[18px] md:font-medium'>
                <s>{displayOriginalPrice}</s>
              </Typography>
            )}
          </>
          <Typography className='mt-[3px] text-grey-600'>
            {isHotel(offer)
              ? 'за сутки'
              : `за ${calculateNights(offer.start_date, offer.end_date)} ночей`}
          </Typography>
        </div>

        {(isTour(offer) || isHotel(offer)) && displayBadges.length > 0 && (
          <ul
            className={`hide-scroll mt-[3px] flex h-[30px] gap-[18px] overflow-x-auto md:mt-[8px] md:justify-normal md:gap-[18px] lg:mt-[13px] lg:gap-4 ${isHotel(offer) ? 'pl-4' : 'px-5'} md:px-5`}
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
