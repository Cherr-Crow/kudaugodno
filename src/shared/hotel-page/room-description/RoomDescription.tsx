/* eslint-disable import/order */
import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
// eslint-disable-next-line import/order
import { Typography } from '@/shared/typography';

import { RoomDescriptionProps } from './RoomDescription.types';

const RoomDescription: React.FC<RoomDescriptionProps> = ({ description }) => {
  return (
    <div className='flex-col gap-2'>
      <div className='mb-3 flex'>
        <Typography variant='m-bold' className='text-black md:hidden'>
          Цена за
        </Typography>
        <div>
          <SvgSprite name='room-guests' width={40} className='ml-2 md:hidden' />
        </div>
      </div>

      <div className='mb-2 flex gap-2 md:text-xs lg:text-base'>
        <SvgSprite name='bed' className='' />
        {description} Двухспальная кровать
      </div>
    </div>
  );
};

export default RoomDescription;
