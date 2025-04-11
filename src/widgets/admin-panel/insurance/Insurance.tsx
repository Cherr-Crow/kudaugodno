'use client';

import React, { useState } from 'react';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { Select } from '@/shared/ui/select';

import { IInsurance } from './Insurance.types';

export function Insurance({}: IInsurance) {
  // Видимость блока со страховкой от невыезда
  const [visibleDeparture, setVisibleDeparture] = useState(false);

  return (
    <section className='w-full'>
      <form className='flex flex-col gap-[20px]'>
        <div className='flex flex-col gap-[20px]'>
          <Typography variant='h5' className='text-[16px] leading-[24px]'>
            Медицинская
          </Typography>
          <div className='flex w-full flex-col gap-[20px]'>
            <div className='flex w-full flex-col gap-[4px]'>
              <Typography variant='h5' className='text-[16px] leading-[24px]'>
                Страховая компания
              </Typography>
              <Select
                options={['123']}
                color='blue'
                size='small'
                className='w-full'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <div
            onClick={() => setVisibleDeparture(!visibleDeparture)}
            className='w-fit'
          >
            <Checkbox label='От невыезда' />
          </div>
          {visibleDeparture && (
            <div className='flex w-full flex-col gap-[20px]'>
              <div className='flex w-full flex-col gap-[4px]'>
                <Typography variant='h5' className='text-[16px] leading-[24px]'>
                  Страховая компания
                </Typography>
                <Select
                  options={['123']}
                  color='blue'
                  size='small'
                  className='w-full'
                />
              </div>
            </div>
          )}
        </div>
        <div className={'mt-[8px] flex gap-4 sm:mt-[12px] sm:justify-end'}>
          <ButtonCustom variant='secondary' size='s'>
            <Typography variant='l-bold'>Отменить</Typography>
          </ButtonCustom>
          <ButtonCustom variant='primary' size='s'>
            <Typography variant='l-bold'>Сохранить</Typography>
          </ButtonCustom>
        </div>
      </form>
    </section>
  );
}
