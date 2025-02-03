import React from 'react';
import { RoomAmenitiesProps } from './RoomAmenities.types';
import { SvgSprite } from '@/shared/svg-sprite';



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

// const RoomDescription: React.FC<RoomDescriptionProps> = ({ description }) => {

