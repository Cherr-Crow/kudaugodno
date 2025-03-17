'use client';
import React, { useState } from 'react';

import { nanoid } from 'nanoid';

import { Breadcrumbs } from '@/shared/breadcrumbs';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { OtherTours } from '@/shared/ui/other-tours/OtherTours';
import { ReviewsTours } from '@/shared/ui/reviews-tours';
import { RoomCards } from '@/shared/ui/room-cards';
import { IRoomCards } from '@/shared/ui/room-cards/RoomCards.types';
import { ToursBlockPhoto } from '@/widgets/tours-block-photo';
export default function CatalogTours() {
  const [rooms] = useState<IRoomCards[]>([
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
  return (
    <div className='container'>
      <Breadcrumbs></Breadcrumbs>
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
          >
            <Typography variant='l-bold'>Показать ещё</Typography>
          </ButtonCustom>
        </div>
      </section>
      <ReviewsTours />
    </div>
  );
}
