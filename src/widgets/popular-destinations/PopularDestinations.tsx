import React from 'react';

import { Typography } from '@/shared/ui/typography';

import { IPopularDestinations } from './PopularDestinations.types';

export function PopularDestinations({ className }: IPopularDestinations) {
  const destinations = [
    {
      name: 'Таиланд',
      price: '100 234 ₽',
      tours: 345,
      image: 'popular_destination.png',
    },
    {
      name: 'Шри-Ланка',
      price: '100 234 ₽',
      tours: 345,
      image: 'popular_destination.png',
    },
    {
      name: 'Египет',
      price: '100 234 ₽',
      tours: 345,
      image: 'popular_destination.png',
    },
    {
      name: 'Португалия',
      price: '100 234 ₽',
      tours: 345,
      image: 'popular_destination.png',
    },
    {
      name: 'Индонезия',
      price: '100 234 ₽',
      tours: 345,
      image: 'popular_destination.png',
    },
    {
      name: 'Казахстан',
      price: '100 234 ₽',
      tours: 345,
      image: 'popular_destination.png',
    },
  ];

  return (
    <section className={`${className} container`}>
      <div className='mx-auto'>
        <div className='mb-12 lg:mb-6'>
          <Typography
            variant='l-bold'
            className='text-start font-medium lg:text-3xl'
          >
            Популярные направления
            <Typography
              variant='l-bold'
              className='ml-2 font-medium text-blue-600 lg:text-3xl'
            >
              России и СНГ, Европы, Азии, Африки, Австралии
            </Typography>
          </Typography>
        </div>

        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
          {destinations.map((destination, index) => (
            <div
              key={index}
              className='relative h-[230px] overflow-hidden rounded-3xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-lg'
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className='h-48 w-full object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 flex h-[72px] items-center rounded-3xl bg-white p-5 font-medium'>
                <Typography variant='l-bold'>
                  {destination.name}
                  <Typography variant='l-bold' className='ml-4 text-blue-600'>
                    от {destination.price}
                  </Typography>
                </Typography>
              </div>

              <div className='text-gray-700 absolute right-4 top-4 flex h-[50px] items-center justify-center rounded-3xl bg-white px-3 py-1 text-center shadow-sm'>
                {destination.tours} туров
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
