'use client';

import React from 'react';

import { useGetPopularToursQuery } from '@/servicesApi/popularApi';
import { Typography } from '@/shared/ui/typography';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';

import { IPopularDestinations } from './PopularDestinations.types';

export function PopularDestinations({ className }: IPopularDestinations) {
  const { data, error } = useGetPopularToursQuery();

  if (error) return <p className='flex justify-center'>Ошибка при загрузке</p>;
  if (!data)
    return <p className='flex justify-center'>Популярных направлений нет</p>;

  function pluralizeTours(count: number): string {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) return `${count} тур`;
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100))
      return `${count} тура`;
    return `${count} туров`;
  }

  return (
    <section className={`${className} -mb-3 md:mb-0`}>
      <div className='container mx-auto'>
        <div className='mb-5 md:mb-6 lg:mb-6'>
          <Typography
            variant='h5'
            className='text-start leading-6 md:text-3xl md:leading-8 lg:text-4xl'
          >
            Популярные направления
            <br className='md:hidden' /> России и СНГ, Европы, Азии, Африки,
            Австралии
          </Typography>
        </div>
      </div>

      <div className='hide-scroll overflow-x-auto px-[calc((100vw-100%)/2+8px)] md:!container xs:px-[calc((100vw-360px)/2+8px)] xxs:px-[calc((100vw-500px)/2+12px)] sm:px-[calc((100vw-620px)/2+16px)] md:mx-auto md:overflow-visible'>
        <ul className='flex flex-nowrap gap-3 md:grid md:grid-cols-2 md:gap-5 md:px-0 lg:grid-cols-3'>
          {data.map((destination, index) => (
            <li
              key={index}
              className='relative mb-3 h-[222px] w-[284px] flex-shrink-0 overflow-hidden rounded-3xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-lg md:mb-0 md:w-full lg:w-full'
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={destination.photo}
                alt={destination.arrival_country}
                className='h-48 w-full object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 flex h-[65px] items-center rounded-3xl bg-white p-5 font-medium'>
                <Typography variant='l-bold'>
                  {destination.arrival_country}
                  <Typography variant='l-bold' className='ml-4 text-blue-600'>
                    от {formatNumberToPriceInRub(destination.price)}
                  </Typography>
                </Typography>
              </div>

              <div className='text-gray-700 absolute right-4 top-4 flex h-[50px] items-center justify-center rounded-3xl bg-white px-3 py-1 text-center shadow-sm md:h-[47px]'>
                {pluralizeTours(destination.tours_count)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
