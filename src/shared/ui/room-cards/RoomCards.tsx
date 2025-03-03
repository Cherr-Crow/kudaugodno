import React from 'react';

import { nanoid } from 'nanoid';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IRoomCards } from './RoomCards.types';
import { ButtonCustom } from '../button-custom';

export function RoomCards({
  name,
  services,
  there,
  back,
  tourOperator,
  coste,
}: IRoomCards) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  };
  return (
    <div className='mb-4 flex min-h-[194px] flex-col rounded-[20px] p-4 shadow-xl lg:flex-row lg:justify-between'>
      <div className='flex flex-col'>
        <Typography variant='h5' className='mb-4'>
          {name}
        </Typography>
        <div className='flex place-content-between items-center'>
          <div className='grid min-h-[72px] w-full gap-4 rounded-[20px] bg-[#EDEDED] p-5 lg:grid-cols-8'>
            {services.map((elem) => {
              return (
                <div className='flex items-center justify-start' key={nanoid()}>
                  <SvgSprite name={`${elem.type}`} width={24} className='mr-3' />
                  <Typography variant='s-bold' className='text-black text-nowrap'>
                    {elem.text}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div className='mt-3 grid grid-cols-2 lg:flex'>
          <Typography className='mr-5'>{`Туда ${there.toLocaleDateString('ru-RU', options)}`}</Typography>
          <Typography className='mr-5'>{`Обратно ${back.toLocaleDateString('ru-RU', options)}`}</Typography>
          <Typography className='mr-5'>{`Туроператор ${tourOperator}`}</Typography>
          <Typography className='mr-5'>{`На сколько ${(back.getTime() - there.getTime()) / (1000 * 60 * 60 * 24)}`}</Typography>
        </div>
      </div>
      <div className='h-x[72px] grid rounded-[20px]'>
        <div className='flex items-center justify-end'>
          <ButtonCustom
            variant='primary'
            size='m'
            type='submit'
            className='mt-2 w-full xl:mt-0'
            style={{ gridArea: 'btnSubmit' }}
          >
            <Typography variant='s-bold'>{`${coste}₽ за 2- х`}</Typography>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
