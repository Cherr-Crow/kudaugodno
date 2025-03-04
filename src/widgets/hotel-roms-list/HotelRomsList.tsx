/* eslint-disable react/no-children-prop */

import React, { useEffect, useState } from 'react';

import { RoomCard } from '@/entities/room-card';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

import { HotelRomsListProps } from './HotelRomsList.types';

const HotelRomsList: React.FC<HotelRomsListProps> = ({ rooms }) => {
  const [count, setCount] = useState<number>(1);
  const [bottonShowMore, setBottonShowMore] = useState<boolean>(true);

  console.log(count);

  const roomCount = rooms.length;
  console.log(roomCount);

  useEffect(() => {
    if (roomCount === count) {
      setBottonShowMore(false);
    }
  }, [count]);

  const handleShowMore = () => {
    setCount(1 + count);
  };

  const handleClose = () => {
    setCount(1);
    setBottonShowMore(true);
  };

  return (
    <div className='hotel-rooms-list'>
      {rooms.slice(0, count).map((room) => (
        <div key={room.id}>
          <RoomCard key={room.id} room={room} />
        </div>
      ))}
      {bottonShowMore ? (
        <div className='group mb-7 mt-6 flex w-full items-center justify-center md:relative md:mb-9'>
          <ButtonCustom
            variant='tetriary'
            size='m'
            className=''
            onClick={handleShowMore}
          >
            <Typography variant='m-bold' children='Показать ещё' />
          </ButtonCustom>
        </div>
      ) : (
        <div className='group mb-7 mt-6 flex w-full items-center justify-center md:relative md:mb-9'>
          <ButtonCustom
            variant='tetriary'
            size='m'
            className=''
            onClick={handleClose}
          >
            <Typography variant='m-bold' children='Скрыть' />
          </ButtonCustom>
        </div>
      )}
    </div>
  );
};

export default HotelRomsList;
