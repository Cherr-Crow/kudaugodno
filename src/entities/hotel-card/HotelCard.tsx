'use client';

import React from 'react';

import { nanoid } from 'nanoid';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IHotelCard } from './HotelCard.types';


export function HotelCard({ hotel }: IHotelCard) {
  const { name, photos, city, country, user_rating, star_category, amenities } =
    hotel;

  const stars = Array.from({ length: star_category }, (_, index) => index + 1);

  return (
    <article className='relative overflow-hidden rounded-3xl bg-white shadow-lg'>
      <div className='absolute left-0 top-4 flex w-full justify-between px-4'>
        <div className='rounded-2xl bg-blue-disabled p-3'>
          <Typography children='Цена с перелетом' />
        </div>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-disabled'>
          <SvgSprite name='heart-outline' width={24} />
        </div>
      </div>
      <img src={photos[0].photo} alt='' className='w-full' />
      <div className='relative bottom-7 flex w-full flex-col gap-2 rounded-t-3xl bg-white px-4 pt-4'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <SvgSprite name='location' width={24} />
            <Typography children={city + ','} variant='m-bold' />
            <Typography children={country} variant='m-bold' />
          </div>
          <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-green-secondary p-2'>
            <Typography children={user_rating} variant='m-bold' />
          </div>
        </div>
        <div className=''>
          <div className='flex gap-1'>
            {stars.map((star) => (
              <SvgSprite key={star} name='star-full' width={16} />
            ))}
          </div>
          <Typography children={name} variant='m-bold' className='md:text-2xl' />
        </div>
        <Typography
          children={'distance_to_sea' + ' ' + 'км' + ' ' + 'от моря'}
          className='text-grey-600'
        />
        <div className='flex gap-1'>
          <Typography
            children='от'
            variant='m-bold'
            className='text-blue-600 md:text-xl'
          />
          <Typography
            children='3500'
            variant='m-bold'
            className='text-blue-600 md:text-xl'
          />
          <Typography
            children='₽'
            variant='m-bold'
            className='text-blue-600 md:text-xl'
          />
          <Typography children='за сутки' className='text-grey-600 md:text-xl' />
        </div>
        <ul className='flex gap-2'>
          {amenities.map((el) => (
            <li className='rounded-2xl bg-blue-light px-3 py-1' key={nanoid()}>
              <Typography children={el.amenity[0]} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
