'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery, useGetRoomsHotelQuery } from '@/servicesApi/hotelsApi';
import { RoomType } from '@/types/room';
import { RoomsListForAdminPanel } from '@/widgets/admin-panel/rooms-list-for-admin-panel';

export default function Rooms() {
  const hotelId = useSearchParams().get('id');
  const { data: hotel } = useGetOneHotelQuery(+hotelId!);
  const { data: roomsList } = useGetRoomsHotelQuery(+hotelId!);

  // TODO: делаю категории через useState, что бы при добавлении/удалении комнаты не перерисовывались остальные списки. Вариант хреновый, потому что не динамический
  const [roomsListOne, setRoomsListOne] = useState<RoomType[]>([]);
  const [roomsListTwo, setRoomsListTwo] = useState<RoomType[]>([]);
  const [roomsListThird, setRoomsListThird] = useState<RoomType[]>([]);
  const [roomsListFourth, setRoomsListFourth] = useState<RoomType[]>([]);
  const [roomsListFifth, setRoomsListTFifth] = useState<RoomType[]>([]);

  useEffect(() => {
    if (!hotel || !roomsList) return;
    hotel.room_categories.map((nameCategory) => {
      switch (nameCategory) {
        case 'Стандарт':
          setRoomsListOne(
            roomsList.results.filter((room) => room.category === 'Стандарт'),
          );
          break;
        case 'Полулюкс':
          setRoomsListTwo(
            roomsList.results.filter((room) => room.category === 'Полулюкс'),
          );
          break;
        case 'Люкс':
          setRoomsListThird(
            roomsList.results.filter((room) => room.category === 'Люкс'),
          );
          break;
        case 'Апартаменты':
          setRoomsListFourth(
            roomsList.results.filter((room) => room.category === 'Апартаменты'),
          );
          break;
        case 'Студия':
          setRoomsListTFifth(
            roomsList.results.filter((room) => room.category === 'Студия'),
          );
          break;
        default:
          return;
      }
    });
  }, [hotel, roomsList]);

  return (
    <div className='flex flex-col gap-4'>
      <RoomsListForAdminPanel category='Стандарт' roomsList={roomsListOne} />
      <RoomsListForAdminPanel category='Полулюкс' roomsList={roomsListTwo} />
      <RoomsListForAdminPanel category='Люкс' roomsList={roomsListThird} />
      <RoomsListForAdminPanel category='Апартаменты' roomsList={roomsListFourth} />
      <RoomsListForAdminPanel category='Студия' roomsList={roomsListFifth} />
    </div>
  );
}
