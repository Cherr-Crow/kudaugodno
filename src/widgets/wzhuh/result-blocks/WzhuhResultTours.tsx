import Link from 'next/link';

import { OfferCard } from '@/entities/offer-card';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { ITourMiniDataWzhuh } from '@/types/wzhuh';

import { adaptTourWzhuhToMiniData } from '../adaptersToMiniData';

type WzhuhResultToursProps = {
  tours: ITourMiniDataWzhuh[];
};

export function WzhuhResultTours({ tours }: WzhuhResultToursProps) {
  return (
    <div className='mb-5 overflow-hidden rounded-[20px] bg-blue-500 pt-5 md:mb-10 md:pt-9 lg:pt-10'>
      <div className='mb-[18px] px-5 md:mb-8'>
        <div className='flex items-center justify-between text-white'>
          <Typography variant='l-bold' className='md:text-[32px]'>
            Туры по&nbsp;специальной цене
          </Typography>
          <div className=''>
            <Link
              href='/catalog-tours'
              className='flex items-center pr-2 md:gap-5 md:pr-4 lg:gap-6 lg:pr-4'
            >
              <Typography className='hidden md:block md:text-lg md:font-medium'>
                Смотреть больше
              </Typography>
              <SvgSprite name='arrow-pointer' width={15} />
            </Link>
          </div>
        </div>
      </div>

      <ul className='hide-scroll flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-[18px] pb-[18px] md:gap-5 md:pb-6 lg:gap-4 lg:px-5 lg:pb-4'>
        {tours &&
          tours.map((tour) => (
            <li
              key={tour.id}
              className='min-h-[372px] min-w-[284px] md:min-h-[530px] md:min-w-[380px] lg:min-h-[530px] lg:min-w-[366px]'
            >
              <OfferCard offer={adaptTourWzhuhToMiniData(tour)} />
            </li>
          ))}
      </ul>
    </div>
  );
}
