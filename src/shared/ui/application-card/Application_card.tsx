import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IApplicationCard } from './Application_card.types';

export function ApplicationCard({}: IApplicationCard) {
  return (
    <div className='mb-4 flex min-h-[194px] w-full flex-col rounded-[20px] border-e-grey-400 p-5 shadow-xl lg:justify-between'>
      <div className='flex w-full items-center justify-between'>
        <Typography variant='subtitle4'>Иванов Иван | Москва – Турция</Typography>
        <SvgSprite className={'bg-[#F7F7F7]'} name={'ellipsisVertical'}></SvgSprite>
      </div>
      <Typography variant={'m'}>№123456789</Typography>
      <div className={'gap-4 bg-[#EEF5FF] p-5'}>
        <div className={'flex'}>
          <Typography variant={'m-bold'}>Даты: </Typography>
          <Typography variant={'m'}>23.10–28.10</Typography>
        </div>
        <div className={'flex'}>
          <Typography variant={'m-bold'}>Количество: </Typography>
          <Typography variant={'m'}>2 гостей</Typography>
        </div>
        <div className={'flex gap-4'}>
          <div className={'flex'}>
            <Typography variant={'m-bold'}>Отель: </Typography>
            <Typography variant={'m'}>Super puper hotel</Typography>
          </div>
          <div className={'flex'}>
            <Typography variant={'m-bold'}>Перелет: </Typography>
            <Typography variant={'m'}>S7</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
