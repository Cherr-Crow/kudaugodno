import React from 'react';

import { Typography } from '@/shared/typography';

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
    <section className={`${className}`}>
      <div className="mx-auto">

        <div className='mb-12 lg:mb-6'>
          <Typography variant="l-bold" className="text-start font-medium lg:text-3xl">
            Популярные направления

            <Typography variant="l-bold" className='ml-2 text-blue-600 font-medium lg:text-3xl'>
              России и СНГ, Европы, Азии, Африки, Австралии
            </Typography>

          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="relative h-[230px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute h-[72px] p-5 font-medium bottom-0 left-0 right-0 rounded-3xl bg-white flex items-center">
                <Typography variant="l-bold">
                  {destination.name}
                  <Typography
                    variant="l-bold"
                    className="text-blue-600 ml-4"
                  >
                    от {destination.price}
                  </Typography>
                </Typography>

              </div>

              <div className="absolute h-[50px] top-4 right-4 bg-white text-center text-gray-700 px-3 py-1 rounded-3xl shadow-sm flex items-center justify-center">
                {destination.tours} туров
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
