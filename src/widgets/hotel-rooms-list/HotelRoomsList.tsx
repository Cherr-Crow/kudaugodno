'use client';

import React, { useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/query/react';

import { RoomCard } from '@/entities/room-card';
import { ClickWrapper } from '@/entities/room-card/ClickWrapper';
import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Modal } from '@/shared/modal';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';
import { RoomType } from '@/types/room';

import { HotelRoomsListProps } from './HotelRoomsList.types';
import { RoomModal } from '../room-modal';

export const HotelRoomsList: React.FC<HotelRoomsListProps> = ({
  rooms,
  hotelId,
}) => {
  const [visibleCards, setVisibleCards] = useState<number>(
    Math.min(rooms.length, 5),
  );

  React.useEffect(() => {
    setVisibleCards(Math.min(rooms.length, 5));
  }, [rooms]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const { data: hotel } = useGetOneHotelQuery(hotelId ?? skipToken);

  const handleOpenModal = (room: RoomType) => {
    setSelectedRoom(room);
    setIsOpenModal(true);
  };

  const handleShowMore = () => {
    setVisibleCards((prev) => Math.min(prev + 5, rooms.length));
  };

  const handleClose = () => {
    setVisibleCards(Math.min(rooms.length, 5));
  };

  const isShowMore = visibleCards < rooms.length;
  const shouldShowButton = rooms.length > 5;

  return (
    <>
      <ul className='flex flex-col gap-3 md:gap-5'>
        {rooms.slice(0, visibleCards).map((room) => (
          <li
            key={room.id}
            className='relative z-0 rounded-[20px] bg-white transition-transform duration-300 hover:scale-[1.02] md:border md:border-grey-50 md:shadow-md'
          >
            <ClickWrapper onClick={() => handleOpenModal(room)}>
              <RoomCard hotelId={hotelId} room={room} />
            </ClickWrapper>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isOpenModal}
        getState={() => setIsOpenModal(false)}
        isNewVariation={true}
        hasScrollbar={true}
      >
        {selectedRoom && <RoomModal room={selectedRoom} rules={hotel?.rules} />}
      </Modal>

      {shouldShowButton && (
        <div className='group mb-7 mt-6 flex w-full items-center justify-center md:relative md:mb-9'>
          <ButtonCustom
            variant='tetriary'
            size='m'
            onClick={isShowMore ? handleShowMore : handleClose}
          >
            <Typography variant='m-bold'>
              {isShowMore ? 'Показать ещё' : 'Скрыть'}
            </Typography>
          </ButtonCustom>
        </div>
      )}
    </>
  );
};
