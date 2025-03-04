'use client';

import React from 'react';

import { nanoid } from 'nanoid';

// import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IHotelAmenities } from './HotelAmenities.types';

export function HotelAmenities({ amenities }: IHotelAmenities) {
  // const { data: hotel, isLoading, isError } = useGetOneHotelQuery(1);

  // if (isLoading) return <div>Загрузка...</div>;
  // if (isError) return <div>Ошибка</div>;

  return (
    <section>
      <div className='p-4'>
        <Typography
          variant='l'
          className='font-grey-950 mb-7 block text-blue-900 md:text-[24px] md:font-normal md:text-grey-950 lg:text-[32px]'
        >
          Удобства
        </Typography>
        <ul className='mb-5 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:flex lg:justify-between'>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              В номере
            </p>
            <ul>
              {amenities?.in_the_room.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              Общие
            </p>
            <ul>
              {amenities?.common.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              Спорт и отдых
            </p>
            <ul>
              {amenities?.sports_and_recreation.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              Для детей
            </p>
            <ul>
              {amenities?.children.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
