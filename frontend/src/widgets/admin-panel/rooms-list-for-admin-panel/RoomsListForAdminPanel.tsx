'use client';

import React, { memo } from 'react';

import { nanoid } from 'nanoid';
import { useSearchParams } from 'next/navigation';

import { newRoom } from '@/app/admin-panel-tour-operator/hotels/change-hotel/rooms/service/newRoom';
import { useAddRoomHotelMutation } from '@/servicesApi/hotelsApi';
import { Accordeon } from '@/shared/ui/accordeon';
import { AddedButton } from '@/shared/ui/added-button';
import { RoomForAdminPanel } from '@/widgets/admin-panel/room-for-admin-panel';

import { IRoomsListForAdminPanel } from './RoomsListForAdminPanel.types';

export const RoomsListForAdminPanel = memo(function RoomsListForAdminPanel({
  category,
  roomsList,
}: IRoomsListForAdminPanel) {
  const hotelId = useSearchParams().get('id');
  const [addRoom] = useAddRoomHotelMutation();

  const handleAddRoom = async (category: string) => {
    if (!hotelId) return;

    await addRoom({ body: { ...newRoom, category }, id: +hotelId });
  };

  return (
    <Accordeon title={category}>
      <ul>
        {roomsList &&
          roomsList
            .filter((el) => el.category === category)
            .map((room) => (
              <li key={nanoid()}>
                <RoomForAdminPanel room={room} />
              </li>
            ))}
      </ul>
      <AddedButton
        text='Добавить номер'
        className='p-5'
        onClick={() => handleAddRoom(category)}
      />
    </Accordeon>
  );
});
