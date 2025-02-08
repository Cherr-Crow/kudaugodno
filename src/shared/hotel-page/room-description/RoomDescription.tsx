import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { RoomDescriptionProps } from './RoomDescription.types';

const RoomDescription: React.FC<RoomDescriptionProps> = ({ description }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex'>
        <Typography variant='m-bold' className='text-black sm:hidden'>
          Цена за
        </Typography>
        <SvgSprite name='room-guests' className='ml-2 md:hidden' />
      </div>

      <div className='mb-2 flex gap-2 md:text-xs lg:text-base'>
        <SvgSprite name='bed' className='' />
        {description}Двухспальная кровать
      </div>
    </div>
  );
};

export default RoomDescription;
