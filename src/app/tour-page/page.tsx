'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter, useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { useGetToursByHotelQuery } from '@/servicesApi/toursApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { OtherTours } from '@/shared/ui/other-tours/OtherTours';
import { ReviewsTours } from '@/shared/ui/reviews-tours';
import { RoomCards } from '@/shared/ui/room-cards';
import { IRoomCards } from '@/shared/ui/room-cards/RoomCards.types';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { Typography } from '@/shared/ui/typography';
import { getDateNow } from '@/shared/utils/getDateNow';
import { useSearchBlockState } from '@/shared/utils/useSearchBlockState';
import { IHotel } from '@/types/hotel';
import { ITour } from '@/types/tour-type';
import { ToursBlockPhoto } from '@/widgets/tours-block-photo';

function CatalogToursContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hotelId = Number(searchParams.get('hotelId')) ?? null;
  const [allRooms, setAllRooms] = useState<IRoomCards[]>([]);
  const [visibleRooms, setVisibleRooms] = useState<IRoomCards[]>([]);
  const [roomsToShow, setRoomsToShow] = useState(5);
  const [hotel, setHotel] = useState<IHotel | null>(null);
  const [tours, setTours] = useState<ITour[] | null>(null);

  // Инициализация компонента стейтов для SearchTour
  const searchState = useSearchBlockState({
    defaultCheckInDate: `${getDateNow(+5)}`,
    defaultNights: '7 ночей',
    defaultGuests: '2 гостя',
  });
  const { updateUrlParams, ...searchProps } = searchState;

  // Обновление URL
  useEffect(() => {
    updateUrlParams(router, hotelId);
  }, [
    searchProps.departureCity,
    searchProps.where,
    searchProps.checkInDate,
    searchProps.checkOutDate,
    searchProps.nights,
    searchProps.guests,
  ]);

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
    hotelId,
  });

  useEffect(() => {
    if (hotelData) setHotel(hotelData);
  }, [hotelData]);

  useEffect(() => {
    if (toursData) setTours(toursData);
  }, [toursData]);

  // Фильтрация туров
  useEffect(() => {
    if (tours && hotel) {
      const nights = parseInt(searchProps.nights);
      const guests = parseInt(searchProps.guests);

      // Не фильтруем и не показываем ничего, если параметры не выбраны
      if (!nights || !guests) {
        setAllRooms([]);
        setVisibleRooms([]);
        return;
      }

      const filteredTours = tours.filter((tour) => {
        const tourStart = new Date(tour.start_date);
        const tourEnd = new Date(tour.end_date);
        const tourNights = Math.ceil(
          (+tourEnd - +tourStart) / (1000 * 60 * 60 * 24),
        );

        return tourNights === nights;
      });

      const filteredRooms = hotel.rooms.filter((room) => {
        const roomCapacity = room.number_of_adults;
        return guests === roomCapacity;
      });

      const availableCategories = filteredRooms.map((room) => room.category);
      const filteredToursByRooms = filteredTours.filter((tour) =>
        availableCategories.includes(tour.room),
      );

      const mapped: IRoomCards[] = filteredToursByRooms.map((tour) => {
        const matchingRoom = hotel.rooms.find((room) => room.category === tour.room);
        return {
          tourId: tour.id,
          roomId: matchingRoom?.id,
          name: tour.room,
          services: [],
          start_date: tour.start_date,
          end_date: tour.end_date,
          tour_operator: tour.tour_operator ?? 'Без оператора',
          price: String(tour.price),
          guests,
          nights,
        };
      });

      setAllRooms(mapped);
      setVisibleRooms(mapped.slice(0, roomsToShow));
    }
  }, [tours, hotel, hotelId, searchProps.guests, searchProps.nights, roomsToShow]);

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
      {searchProps.isInitialized && (
        <SearchTour type='Туры' hotel={hotel} {...searchProps} />
      )}
      <ToursBlockPhoto />
      <section className='mb-10 mt-10'>
        <OtherTours />
        {visibleRooms.map((room) => (
          <RoomCards key={nanoid()} {...room} roomId={room.roomId} />
        ))}
        {visibleRooms.length < allRooms.length && (
          <div className='mt-8 flex items-center justify-center'>
            <ButtonCustom
              variant='tetriary'
              size='m'
              type='button'
              className='mt-2 xl:mt-0'
              style={{ gridArea: 'btnSubmit' }}
              onClick={() => setRoomsToShow((prev) => prev + 5)}
            >
              <Typography variant='l-bold'>Показать ещё</Typography>
            </ButtonCustom>
          </div>
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
