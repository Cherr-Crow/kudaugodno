/* eslint-disable react/no-children-prop */

import React from 'react';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

import { RoomCard } from '../../entities/room-card';

interface HotelRomsListProps {
  hotels: {
    id: number;
    name: string;
    description: string;
    quadrature: string;
    amenities: string;
    price: number;
    images: string[];
  }[];
}

const HotelRomsList: React.FC<HotelRomsListProps> = ({ hotels }) => {
  return (
    <div className='hotel-rooms-list'>
      {hotels.map((hotel) => (
        <RoomCard
          key={hotel.id}
          id={hotel.id}
          name={hotel.name}
          description={hotel.description}
          quadrature={hotel.quadrature}
          amenities={hotel.amenities}
          price={hotel.price}
          images={hotel.images}
        />
      ))}
      <div className='group mb-7 mt-6 flex w-full items-center justify-center md:relative md:mb-9'>
        <ButtonCustom variant='tetriary' size='m' className=''>
          <div className='flex items-center gap-3 bg-blue-200'>
            <Typography variant='m-bold' children='Показать еще' />
          </div>
        </ButtonCustom>
      </div>
    </div>
  );
};

export default HotelRomsList;
