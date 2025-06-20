import Link from 'next/link';

import { OfferCard } from '@/entities/offer-card';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { IHotelMiniDataWzhuh } from '@/types/wzhuh';

import { adaptHotelWzhuhToMiniData } from '../adaptersToMiniData';

type WzhuhResultHotelsProps = {
  arrival_city: string;
  description_hotel: string;
  hotels: IHotelMiniDataWzhuh[];
};

export function WzhuhResultHotels({
  arrival_city,
  description_hotel,
  hotels,
}: WzhuhResultHotelsProps) {
  return (
    <div className='mb-5 overflow-hidden rounded-[20px] bg-blue-50 pt-5 md:mb-10 md:pt-10'>
      <div className='mb-[17px] flex justify-between px-5 md:mb-8 lg:mb-6'>
        <div className='flex flex-col gap-2 md:gap-4'>
          <Typography variant='l-bold' className='md:text-[32px] md:font-semibold'>
            Отели — {arrival_city}
          </Typography>
          <Typography variant='m' className='md:text-[24px] md:text-grey-800'>
            {description_hotel}
          </Typography>
        </div>

        <div className='lg:flex lg:items-center'>
          <Link
            href={`/catalog-hotels?where=${arrival_city}`}
            className='flex pr-1 md:gap-5 md:pr-4 lg:items-center lg:gap-5 lg:pr-4'
          >
            <Typography className='hidden md:block md:text-lg md:font-semibold'>
              Смотреть больше
            </Typography>
            <SvgSprite name='arrow-pointer' width={15} />
          </Link>
        </div>
      </div>

      <ul className='hide-scroll flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-[18px] pb-[18px] md:gap-5 md:pb-7 lg:gap-4 lg:overflow-hidden lg:px-5 lg:pb-4'>
        {hotels &&
          hotels.map((hotel) => (
            <li
              key={hotel.id}
              className='max-h-[364px] min-w-[284px] md:max-h-[554px] md:min-w-[380px] lg:min-w-[370px]'
            >
              <OfferCard
                offer={adaptHotelWzhuhToMiniData(hotel)}
                needHotelBadges={true}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
