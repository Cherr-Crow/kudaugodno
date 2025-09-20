import React from 'react';

import { IAnnouncementBlock } from './AnnouncementBlock.types';
import { ButtonCustom } from '../ui/button-custom';
import { Typography } from '../ui/typography';

export function AnnouncementBlock({}: IAnnouncementBlock) {
  return (
    <div
      className='announcement-block relative mt-6 flex flex-row items-center justify-between px-6 py-6 md:pr-0'
      key='announcement'
    >
      <div className='announcement-block-backgorund absolute inset-0 z-0 rounded-xl bg-blue-50 md:bottom-6 md:top-6 lg:top-12'></div>

      <div className='z-10 flex flex-col items-center justify-center gap-2 rounded-xl text-center md:items-start md:text-left'>
        <Typography variant='h4' className='text-lg text-blue-950'>
          Скидка на 10% на первую поездку
        </Typography>
        <ButtonCustom
          type='button'
          variant='primary'
          size='s'
          className='w-full text-sm font-bold text-green-950 md:w-auto md:border-blue-600 md:bg-blue-600 md:text-white md:hover:border-blue-200 md:hover:bg-blue-200 md:active:border-blue-500 md:active:bg-blue-500'
        >
          Узнать подробнее
        </ButtonCustom>
      </div>

      <div className='z-10 hidden w-1/2 justify-end md:flex'>
        <img
          src='famous-tourists-sights.png'
          alt='famous-tourists-sights'
          className='h-auto max-w-full object-contain'
        />
      </div>
    </div>
  );
}
