import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { RoomAmenitiesProps } from './RoomAmenities.types';

const RoomAmenities: React.FC<RoomAmenitiesProps> = ({ amenities }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2 md:flex-col'>
        <div className='justify-center md:flex md:w-full md:items-center'>
          <SvgSprite name='icutlery_items' className='' />
        </div>
        <Typography className='text-4 font-normal text-blue-950 md:text-[13px] lg:text-[16px]'>
          {amenities}
        </Typography>
      </div>
    </div>
  );
};

export default RoomAmenities;
