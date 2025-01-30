import React from 'react';
import { RoomAmenitiesProps } from './RoomAmenities.types';
import { SvgSprite } from '@/shared/svg-sprite';

type Amenity = '24 м2' | 'Завтрак включен'; 

type AmenityIcon = 'square_room' | 'icutlery_items'; 

const amenitiesIcons: Record<Amenity, AmenityIcon> = {
  '24 м2': 'square_room',
  'Завтрак включен': 'icutlery_items',
};

const RoomAmenities: React.FC<RoomAmenitiesProps> = ({ amenities }) => {
  return (
    <ul className="list-none md:hidden">
      {amenities.map((amenity, index) => (
        <li key={index} className="mt-2 flex items-center gap-2">
            <SvgSprite name={amenitiesIcons[amenity as Amenity]} className='' />
            {amenity}
        </li>
      ))}
    </ul>
  );
};

export default RoomAmenities;