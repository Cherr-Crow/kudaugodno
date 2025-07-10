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
import { ITour } from '@/types/tour';
import { ToursBlockPhoto } from '@/widgets/tours-block-photo';

function CatalogToursContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hotelId = Number(searchParams.get('hotelId')) ?? null;
  // const tourId = Number(searchParams.get('tourId')) ?? null;
  const [allRooms, setAllRooms] = useState<IRoomCards[]>([]);
  const [visibleRooms, setVisibleRooms] = useState<IRoomCards[]>([]);
  const [roomsToShow, setRoomsToShow] = useState(5);
  const [hotel, setHotel] = useState<IHotel | null>(null);
  const [tours, setTours] = useState<ITour[]>([]);

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
    updateUrlParams(router, hotelId);
  }, [
    searchProps.departureCity,
    searchProps.where,
    searchProps.checkInDate,
    searchProps.nights,
    searchProps.guests,
  ]);

  const {
    data: hotelData,
    isLoading: isHotelLoading,
    isError: isHotelError,
  } = useGetOneHotelQuery(hotelId);

  const {
    data: toursData,
    isLoading: isToursLoading,
    isError: isToursError,
  } = useGetToursByHotelQuery({ hotelId, limit: 10 }, { skip: !hotelId });

  useEffect(() => {
    if (hotelData) setHotel(hotelData);
  }, [hotelData]);
  console.log('hotel rooms', hotel?.rooms);
  useEffect(() => {
    if (toursData) setTours(toursData.results);
  }, [toursData?.results]);

  console.log('tour', tours);
  // Фильтрация туров
  useEffect(() => {
    if (!tours || !hotel) return;

    const nights = parseInt(searchProps.nights.match(/\d+/)?.[0] || '0');
    const guests = parseInt(searchProps.guests.match(/\d+/)?.[0] || '0');

    if (!nights || !guests) {
      setAllRooms([]);
      setVisibleRooms([]);
      return;
    }

    const filteredTours = tours.filter((tour) => {
      if (!tour.start_date || !tour.end_date || !tour.rooms?.length) return false;

      const start = new Date(tour.start_date);
      const end = new Date(tour.end_date);
      const tourNights = Math.ceil((+end - +start) / (1000 * 60 * 60 * 24));
      return tourNights >= nights;
    });

    const filteredRooms =
      hotel.rooms?.filter((room) => guests <= (room.number_of_adults ?? 0)) ?? [];
    const availableCategories = new Set(
      filteredRooms.map((room) => room.category?.trim().toLowerCase()),
    );

    const filteredToursByRooms = filteredTours.filter((tour) => {
      const category = tour.rooms?.[0]?.category?.trim().toLowerCase();
      return category && availableCategories.has(category);
    });

    const mapped: IRoomCards[] = filteredToursByRooms.flatMap((tour) => {
      const tourRoomCategory = tour.rooms?.[0]?.category;
      const matchingRoom = hotel.rooms?.find(
        (room) => room?.category === tourRoomCategory,
      );
      if (!matchingRoom || !tour.flight_to || !tour.start_date || !tour.end_date)
        return [];

      return (
        matchingRoom.type_of_meals?.map((meal) => ({
          name: matchingRoom.category,
          tourId: tour.id,
          roomId: matchingRoom.id,
          tour_operator: tour.tour_operator ?? 'Без оператора',
          guests,
          startDate: tour.start_date,
          endDate: tour.end_date,
          formatted_date: `${new Date(tour.start_date).getDate()}-${new Date(tour.end_date).getDate()} ${new Date(tour.start_date).toLocaleString('ru', { month: 'long' })}`,
          photos: matchingRoom.photo,
          meal: meal.name,
          flight_info: {
            type: tour.flight_to.flight_type,
            airline: tour.flight_to.airline,
          },
          total_price: Number(tour.price) + Number(meal.price),
        })) ?? []
      );
    });

    setAllRooms(mapped);
    setVisibleRooms(mapped.slice(0, roomsToShow));
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
      <Breadcrumbs
        paths={[
          { label: 'Туры', href: '/catalog-tours' },
          {
            label: `${hotel?.country}, ${hotel?.city}`,
            href: `/catalog-tours?where=${hotel?.city}`,
          },
          {
            label: `${hotel?.name}`,
            href: `/tour-page?where=${hotel?.city}&hotelName=${hotel?.name}&hotelId=${hotel?.id}`,
          },
        ]}
      />
      {searchProps.isInitialized && <SearchTour hotel={hotel} {...searchProps} />}
      <ToursBlockPhoto hotel={hotel} />
      <section className='mb-10 mt-10'>
        <OtherTours hotel={hotel} tours={tours} />
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
