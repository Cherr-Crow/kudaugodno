'use client';
import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import { useGetToursQuery } from '@/servicesApi/toursApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { OtherTours } from '@/shared/ui/other-tours/OtherTours';
import { ReviewsTours } from '@/shared/ui/reviews-tours';
import { RoomCards } from '@/shared/ui/room-cards';
import { IRoomCards } from '@/shared/ui/room-cards/RoomCards.types';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { ToursBlockPhoto } from '@/widgets/tours-block-photo';
export default function CatalogTours() {
  const [rooms, setRooms] = useState<IRoomCards[]>([
    {
      name: 'Standard Room',
      services: [
        { type: 'eat', text: 'Завтраки' },
        { type: 'airplane', text: 'С перелетом' },
      ],
      there: new Date(2025, 7, 7),
      back: new Date(2025, 7, 12),
      tourOperator: 'Fun&Sun',
      coste: 240894,
    },
    {
      name: 'Standard Room',
      services: [
        { type: 'eat', text: 'Завтраки' },
        { type: 'airplane', text: 'С перелетом' },
      ],
      there: new Date(2025, 7, 7),
      back: new Date(2025, 7, 12),
      tourOperator: 'Fun&Sun',
      coste: 240894,
    },
    {
      name: 'Standard Room',
      services: [
        { type: 'eat', text: 'Завтраки' },
        { type: 'airplane', text: 'С перелетом' },
      ],
      there: new Date(2025, 7, 7),
      back: new Date(2025, 7, 12),
      tourOperator: 'Fun&Sun',
      coste: 240894,
    },
  ]);
  const { data } = useGetToursQuery({});
  useEffect(() => {}, []);
  if (!data) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...!!!</div>;
  }
  return (
    <div className='container'>
      <Breadcrumbs></Breadcrumbs>
      <SearchTour type={'Туры'}></SearchTour>
      <ToursBlockPhoto />
      <section className='mb-10 mt-10'>
        <OtherTours />
        {rooms.map((elem) => {
          return (
            <RoomCards
              name={elem.name}
              services={elem.services}
              there={elem.there}
              back={elem.back}
              tourOperator={elem.tourOperator}
              coste={elem.coste}
              key={nanoid()}
            />
          );
        })}
        <div className='mt-8 flex items-center justify-center'>
          <ButtonCustom
            variant='tetriary'
            size='m'
            type='submit'
            className='mt-2 xl:mt-0'
            style={{ gridArea: 'btnSubmit' }}
            onClick={() => {
              setRooms(rooms.concat(rooms));
            }}
          >
            <Typography variant='l-bold'>Показать ещё</Typography>
          </ButtonCustom>
        </div>
      </section>
      <ReviewsTours />
    </div>
  );
}
