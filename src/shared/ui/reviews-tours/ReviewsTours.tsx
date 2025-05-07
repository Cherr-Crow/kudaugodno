import React, { useEffect, useState } from 'react';

import { useScreen } from 'usehooks-ts';

import { Typography } from '@/shared/ui/typography';

import { IReviewsTours } from './ReviewsTours.types';
import { ButtonCustom } from '../button-custom';
import { ReviewsCard } from '../reviews-card';

export function ReviewsTours({}: IReviewsTours) {
  const screen = useScreen();
  const [title, setTitle] = useState('');
  useEffect(() => {
    screen.width > 767
      ? setTitle('Отзывы о Novotel Nairobi Westlands 4 звезды, Кения, Найроби')
      : setTitle('Отзывы о Novotel Nairobi Westlands');
  }, [screen]);
  return (
    <div className='mb-20'>
      <div className='flex items-center justify-between'>
        <Typography
          variant='h3'
          className={`mb-2 mr-2 flex max-w-[700px] flex-row text-xl font-semibold leading-[40px] md:mb-8 md:text-[40px]`}
        >
          {title}
        </Typography>
        <ButtonCustom variant={'secondary'} size={'l'} className='hidden md:flex'>
          <Typography variant='s-bold'>Оставить отзыв</Typography>
        </ButtonCustom>
      </div>
      <div className='flex items-center'>
        <Typography variant='l' className='mr-8'>
          21 отзыв
        </Typography>
        <Typography className='text-blue-500' variant='l-bold'>
          <a href='#'>Читать все отзывы</a>
        </Typography>
      </div>
      <div className='flex overflow-scroll xl:mt-5 xl:grid xl:grid-cols-3 xl:gap-5 xl:overflow-hidden'>
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
      </div>
    </div>
  );
}
