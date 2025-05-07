/* eslint-disable react/no-children-prop */
import React from 'react';

import { Typography } from '@/shared/ui/typography';

import { RoomPricingProps } from './RoomPricing.types';

const RoomPricing: React.FC<RoomPricingProps> = ({ price }) => {
  return (
    <>
      <div className='flex w-full justify-between gap-1 md:flex-col md:justify-center'>
        <div className='mb-2 flex gap-1 md:justify-center'>
          <Typography className='text-4 font-normal text-blue-950 lg:text-[20px]'>
            {price} руб
          </Typography>
        </div>
        <div className='flex md:justify-center'>
          {/* <Typography
            variant='m'
            children='Цена за 10 ночей'
            className='md:hidden'
          /> */}
          <Typography className='text-4 font-normal text-blue-950 md:hidden md:text-[13px] lg:text-[16px]'>
            Цена за 10 ночей
          </Typography>
          {/* <Typography variant='m' children='10 ночей' className='hidden md:block' /> */}
          <Typography className='text-4 hidden font-normal text-blue-950 md:block md:text-[13px] lg:text-[16px]'>
            10 ночей
          </Typography>
        </div>
      </div>
    </>
  );
};

export default RoomPricing;
