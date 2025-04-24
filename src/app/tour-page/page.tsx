'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { useGetToursByHotelQuery } from '@/servicesApi/toursApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { OtherTours } from '@/shared/ui/other-tours/OtherTours';
import { ReviewsTours } from '@/shared/ui/reviews-tours';
import { RoomCards } from '@/shared/ui/room-cards';
import { IRoomCards } from '@/shared/ui/room-cards/RoomCards.types';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { IHotel } from '@/types/hotel';
import { ToursBlockPhoto } from '@/widgets/tours-block-photo';

function CatalogToursContent() {
  const [rooms, setRooms] = useState<IRoomCards[]>([]);
  const [hotel, setHotel] = useState<IHotel | null>(null);

  const searchParams = useSearchParams();
  const hotelName = searchParams.get('hotel') ?? '';
  const hotelId = Number(
    typeof window !== 'undefined' ? localStorage.getItem('selectedHotelId') : 0,
  );

  const {
    data: hotelData,
    isLoading: isHotelLoading,
    isError: isHotelError,
  } = useGetOneHotelQuery(hotelId || null);

  const {
    data: toursData,
    isLoading: isToursLoading,
    isError: isToursError,
  } = useGetToursByHotelQuery({
    hotelName,
  });

  useEffect(() => {
    if (hotelData) setHotel(hotelData);
  }, [hotelData]);

  useEffect(() => {
    if (toursData) {
      const filteredRooms: IRoomCards[] = toursData.map((tour) => ({
        tourId: tour.id,
        name: tour.room,
        services: [],
        start_date: tour.start_date,
        end_date: tour.end_date,
        tour_operator: tour.tour_operator ?? 'Без оператора',
        price: tour.price,
      }));
      setRooms(filteredRooms);
    }
  }, [toursData]);

  if (isHotelLoading || isToursLoading) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...</div>;
  }

  if (!toursData || !hotelData) {
    return <div className='pt-[40px] text-center text-[32px]'>Данных нет.</div>;
  }

  if (isHotelError || isToursError) {
    return (
      <div className='pt-[40px] text-center text-[32px]'>
        Ошибка при загрузке туров.
      </div>
    );
  }

  return (
    <div className='container'>
      <Breadcrumbs />
      <SearchTour type='Туры' hotel={hotel} />
      <ToursBlockPhoto hotelId={hotelId} />
      <section className='mb-10 mt-10'>
        <OtherTours />
        {rooms.map((elem) => (
          <RoomCards key={nanoid()} {...elem} />
        ))}
        <div className='mt-8 flex items-center justify-center'>
          <ButtonCustom
            variant='tetriary'
            size='m'
            type='submit'
            className='mt-2 xl:mt-0'
            style={{ gridArea: 'btnSubmit' }}
            onClick={() => setRooms((prev) => [...prev, ...prev])}
          >
            <Typography variant='l-bold'>Показать ещё</Typography>
          </ButtonCustom>
        </div>
      </section>
      <ReviewsTours />
    </div>
  );
}

export default function CatalogTours() {
  return (
    <Suspense
      fallback={<div className='pt-10 text-center text-2xl'>Загрузка...</div>}
    >
      <CatalogToursContent />
    </Suspense>
  );
}
