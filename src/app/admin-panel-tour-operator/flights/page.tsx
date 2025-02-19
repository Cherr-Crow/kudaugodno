'use client';

import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

export default function Flights() {
  return (
    <div className='w-full'>
      <div className='flex w-full justify-between'>
        <form
          action=''
          className='flex w-3/4 gap-3 rounded-lg border border-grey-100 p-2'
        >
          <SvgSprite name='search' width={24} />
          <input
            type='text'
            className='w-full outline-none'
            placeholder='Введите идентификатор отеля, название отеля или страну'
          />
        </form>
        <ButtonCustom variant='secondary' size='m' onClick={() => {}}>
          <Typography className='text-nowrap'>Добавить отель</Typography>
        </ButtonCustom>
      </div>
    </div>
  );
}
