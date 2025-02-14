'use client';

import React from 'react';

import { nanoid } from 'nanoid';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IHotelCard } from './HotelCard.types';

export function HotelCard({ hotel }: IHotelCard) {
  const {
    name,
    photos,
    city,
    country,
    user_rating,
    star_category,
    amenities_common,
  } = hotel;

  const stars = Array.from({ length: star_category }, (_, index) => index + 1);

  return (
    <article className='relative overflow-hidden rounded-3xl bg-white shadow-lg'>
      <div className='absolute left-0 top-4 flex w-full justify-between px-4'>
        <div className='rounded-2xl bg-blue-50 p-3'>
          <Typography>Цена с перелетом</Typography>
        </div>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-50'>
          <SvgSprite name='heart-outline' width={24} />
        </div>
      </div>
      <img src={photos[0].photo} alt='' className='w-full' />
      <div className='relative bottom-7 flex w-full flex-col gap-2 rounded-t-3xl bg-white px-4 pt-4'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <SvgSprite name='location' width={24} />
            <Typography variant='m-bold'>{city + ','}</Typography>
            <Typography variant='m-bold'>{country}</Typography>
          </div>
          <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-green-300 p-2'>
            <Typography variant='m-bold'>{user_rating}</Typography>
          </div>
        </div>
        <div className=''>
          <div className='flex gap-1'>
            {stars.map((star) => (
              <SvgSprite key={star} name='star-full' width={16} />
            ))}
          </div>
          <Typography variant='m-bold' className='md:text-2xl'>
            {name}
          </Typography>
        </div>
        <Typography className='text-grey-600'>
          {'distance_to_sea' + ' ' + 'км' + ' ' + 'от моря'}
        </Typography>
        <div className='flex gap-1'>
          <Typography variant='m-bold' className='text-blue-600 md:text-xl'>
            от
          </Typography>
          <Typography variant='m-bold' className='text-blue-600 md:text-xl'>
            3500
          </Typography>
          <Typography variant='m-bold' className='text-blue-600 md:text-xl'>
            ₽
          </Typography>
          <Typography className='text-grey-600 md:text-xl'>за сутки</Typography>
        </div>
        <ul className='flex gap-2'>
          {amenities_common.map((el: { name: string }) => (
            <li className='rounded-2xl bg-blue-200 px-3 py-1' key={nanoid()}>
              <Typography>{el.name}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
