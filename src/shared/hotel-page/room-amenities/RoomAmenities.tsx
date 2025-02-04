import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';

import { RoomAmenitiesProps } from './RoomAmenities.types';



const RoomAmenities: React.FC<RoomAmenitiesProps> = ({ amenities }) => {
  return (
    <div className='flex-col flex gap-2 '>
        <div className='flex gap-2 md:flex-col '>
          <div className='md:flex justify-center md:items-center md:w-full'>
            <SvgSprite name='icutlery_items' className='' />
          </div>
          {amenities}
        </div>
               
    </div>
    
  );
};

export default RoomAmenities;



