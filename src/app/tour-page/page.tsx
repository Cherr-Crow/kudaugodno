/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter, useSearchParams } from 'next/navigation';

import { useGetRoomsHotelQuery } from '@/servicesApi/hotelsApi';
import { useGetOneTourQuery } from '@/servicesApi/toursApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { ReviewsTours } from '@/shared/ui/reviews-tours';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { getDateNow } from '@/shared/utils/getDateNow';
import { useSearchBlockState } from '@/shared/utils/useSearchBlockState';
import { IHotel } from '@/types/hotel';
import { RoomType } from '@/types/room';
import { HotelRoomsList } from '@/widgets/hotel-rooms-list';
import { ToursBlockPhoto } from '@/widgets/tours-block-photo';

function CatalogToursContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tourId = Number(searchParams.get('tourId'));

  const [hotel, setHotel] = useState<Omit<IHotel, 'rooms'> | null>(null);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const {
    data: tourData,
    isLoading: isTourLoading,
    isError: isTourError,
  } = useGetOneTourQuery(tourId!, {
    skip: !tourId || tourId <= 0,
  });

  const { data: roomsData, isLoading: isRoomsLoading } = useGetRoomsHotelQuery(
    hotel?.id ?? skipToken,
  );

  useEffect(() => {
    if (tourData) setHotel(tourData.hotel);
  }, [tourData]);

  useEffect(() => {
    if (roomsData) setRooms(roomsData.results);
  }, [roomsData]);

  // Инициализация компонента стейтов для SearchTour
  const searchState = useSearchBlockState({
    defaultCheckInDate: `${getDateNow(+5)}`,
    defaultNights: '7 ночей',
    defaultGuests: '2 гостя',
    defaultType: 'Туры',
  });
  const { updateUrlParams, ...searchProps } = searchState;

  // Обновление URL
  useEffect(() => {
    if (!isTourLoading && !isTourError && tourData && tourId) {
      updateUrlParams(router, tourId);
    }
  }, [
    searchProps.departureCity,
    searchProps.where,
    searchProps.checkInDate,
    searchProps.nights,
    searchProps.guests,
  ]);

  if (isTourLoading) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...</div>;
  }

  if (!tourData) {
    return <div className='pt-[40px] text-center text-[32px]'>Данных нет.</div>;
  }

  if (isTourError) {
    return (
      <div className='pt-[40px] text-center text-[32px]'>
        Ошибка при загрузке тура.
      </div>
    );
  }

  return (
    <div className='container'>
      <Breadcrumbs
        paths={[
          { label: 'Туры', href: '/catalog?tab=Туры' },
          {
            label: `${hotel?.country}, ${hotel?.city}`,
            href: `/catalog?tab=Туры?where=${hotel?.city}`,
          },
          {
            label: `${hotel?.name}`,
            href: `/tour-page?where=${hotel?.city}&hotelName=${hotel?.name}&hotelId=${hotel?.id}`,
          },
        ]}
      />
      {searchProps.isInitialized && <SearchTour hotel={hotel} {...searchProps} />}
      <ToursBlockPhoto hotel={hotel ? { ...hotel, rooms } : null} />
      <section className='mb-10 mt-10'>
        {isRoomsLoading ? (
          <div className='pt-[40px] text-center text-[32px]'>
            Загрузка номеров...
          </div>
        ) : (
          rooms && <HotelRoomsList rooms={rooms} />
        )}
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
