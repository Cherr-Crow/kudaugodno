import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { RoomSquareProps } from './RoomSquare.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoomSquare: React.FC<RoomSquareProps> = ({ quadrature }) => {
  return (
    <div className='mb-2 flex flex-col gap-2 lg:mt-2'>
      <div className='flex gap-2 md:text-xs lg:text-base'>
        <SvgSprite name='square_room' className='ml-2 md:hidden' />
        <Typography className='text-4 font-normal text-blue-950 md:text-[13px] lg:text-[16px]'>
          {quadrature} м2
        </Typography>
      </div>
    </div>
  );
};

export default RoomSquare;
