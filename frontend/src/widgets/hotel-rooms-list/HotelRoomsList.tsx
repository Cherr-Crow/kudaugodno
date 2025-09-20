'use client';

import React, { useMemo, useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/query/react';

import { RoomCard } from '@/entities/room-card';
import { ClickWrapper } from '@/entities/room-card/ClickWrapper';
import {
  useGetOneHotelQuery,
  useGetHotelTypeOfMealsQuery,
} from '@/servicesApi/hotelsApi';
import { FilterHotelCards } from '@/shared/filter-hotel-cards';
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
  const { data: mealsData } = useGetHotelTypeOfMealsQuery(hotelId ?? skipToken);

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

  const [selectedFilters, setSelectedFilters] = useState<{
    category: string[];
    meals: string[];
    guests: number[];
  }>({
    category: [],
    meals: [],
    guests: [],
  });

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchCategory =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.includes(room.category);

      const matchMeal =
        selectedFilters.meals.length === 0 ||
        ['Без питания', 'Завтрак включен', 'Всё включено'].some((meal) =>
          selectedFilters.meals.includes(meal),
        );

      const totalGuests = room.number_of_adults + room.number_of_children;
      const matchGuests =
        selectedFilters.guests.length === 0 ||
        selectedFilters.guests.includes(totalGuests);

      return matchCategory && matchMeal && matchGuests;
    });
  }, [rooms, selectedFilters]);

  React.useEffect(() => {
    setVisibleCards(Math.min(filteredRooms.length, 5));
  }, [filteredRooms]);

  const isShowMore = visibleCards < filteredRooms.length;
  const shouldShowButton = filteredRooms.length > 5;

  return (
    <>
      <div className='mb-5 items-center justify-between lg:mb-8 lg:flex'>
        <Typography variant='h3' className=''>
          Варианты номеров
        </Typography>
        {mealsData && (
          <FilterHotelCards
            rooms={rooms}
            availableMeals={mealsData}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        )}
      </div>
      <ul className='flex flex-col gap-3 md:gap-5'>
        {mealsData &&
          filteredRooms.slice(0, visibleCards).map((room) => (
            <li
              key={room.id}
              className='relative z-0 rounded-[20px] bg-white transition-transform duration-300 hover:scale-[1.02] md:border md:border-grey-50 md:shadow-md'
            >
              <ClickWrapper onClick={() => handleOpenModal(room)}>
                <RoomCard hotelId={hotelId} room={room} availableMeals={mealsData} />
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
