'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { skipToken } from '@reduxjs/toolkit/query/react';
import { nanoid } from 'nanoid';
import { useRouter, useSearchParams } from 'next/navigation';

// import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { useGetOneTourQuery } from '@/servicesApi/toursApi';
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
import { ITour } from '@/types/tour';
import { ToursBlockPhoto } from '@/widgets/tours-block-photo';

function CatalogToursContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const hotelId = Number(searchParams.get('hotelId')) ?? null;
  const tourId = Number(searchParams.get('hotelId')) ?? null;
  const [allRooms, setAllRooms] = useState<IRoomCards[]>([]);
  const [visibleRooms, setVisibleRooms] = useState<IRoomCards[]>([]);
  const [roomsToShow, setRoomsToShow] = useState(5);
  // const [hotel, setHotel] = useState<IHotel | null>(null);
  const [tour, setTour] = useState<ITour | null>(null);
  // const [tours, setTours] = useState<ITour[] | null>(null);

  const {
    data: tourData,
    isLoading: isTourLoading,
    isError: isTourError,
  } = useGetOneTourQuery(tourId ?? skipToken);

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
    updateUrlParams(router, tourId);
  }, [
    searchProps.departureCity,
    searchProps.where,
    searchProps.checkInDate,
    searchProps.nights,
    searchProps.guests,
  ]);

  // const {
  //   data: hotelData,
  //   isLoading: isHotelLoading,
  //   isError: isHotelError,
  // } = useGetOneHotelQuery(hotelId);

  // const {
  //   data: toursData,
  //   isLoading: isToursLoading,
  //   isError: isToursError,
  // } = useGetToursByHotelQuery({ hotelId, limit: 10 }, { skip: !hotelId });

  // useEffect(() => {
  //   if (hotelData) setHotel(hotelData);
  // }, [hotelData]);

  useEffect(() => {
    if (tourData) setTour(tourData);
  }, [tourData]);

  // Фильтрация туров
  useEffect(() => {
    // if (tour) {
    //   const nights = parseInt(searchProps.nights);
    //   const guests = parseInt(searchProps.guests);

    //   // Не фильтруем и не показываем ничего, если параметры не выбраны
    //   if (!nights || !guests) {
    //     setAllRooms([]);
    //     setVisibleRooms([]);
    //     return;
    //   }

    //   const filteredTours = tours.filter((tour) => {
    //     const tourStart = new Date(tour.start_date);
    //     const tourEnd = new Date(tour.end_date);
    //     const tourNights = Math.ceil(
    //       (+tourEnd - +tourStart) / (1000 * 60 * 60 * 24),
    //     );

    //     return tourNights === nights;
    //   });

    //   const filteredTours = tour.room.filter((obj) => {
    //     obj.date.map((period) => {
    //       const tourStart = new Date(period.start_date);
    //       const tourEnd = new Date(period.end_date);
    //       const tourNights = Math.ceil(
    //         (+tourEnd - +tourStart) / (1000 * 60 * 60 * 24),
    //       );

    //       return tourNights === nights;
    //     })
    //   });

    //   const filteredRooms = tour.room.filter((room) => {
    //     const roomCapacity = room.number_of_adults;
    //     return guests === roomCapacity;
    //   });

    //   const availableCategories = filteredRooms.map((room) => room.category);
    //   const filteredToursByRooms = filteredTours.filter((tour) =>
    //     availableCategories.includes(tour.category),
    //   );

    //   const mapped: IRoomCards[] = filteredToursByRooms.map((tour) => {
    //     const matchingRoom = tour.find((room) => room.category === tour.room);
    //     return {
    //       tourId: tour.id,
    //       roomId: matchingRoom?.id,
    //       name: tour.room,
    //       services: [],
    //       start_date: tour.start_date,
    //       end_date: tour.end_date,
    //       tour_operator: tour.tour_operator ?? 'Без оператора',
    //       price: String(tour.price),
    //       guests,
    //       nights,
    //     };
    //   });

    //   setAllRooms(mapped);
    //   setVisibleRooms(mapped.slice(0, roomsToShow));
    // }
    if (!tour) return;

    const nights = parseInt(searchProps.nights);
    const guests = parseInt(searchProps.guests);

    // Не фильтруем и не показываем ничего, если параметры не выбраны
    if (!nights || !guests) {
      setAllRooms([]);
      setVisibleRooms([]);
      return;
    }

    // Перебираем все номера и их доступные даты
    const matchedRooms: IRoomCards[] = [];

    tour.rooms.forEach((room) => {
      if (!room.dates || room.dates.length === 0) return;

      room.dates.forEach((period) => {
        const tourStart = new Date(period.start_date);
        const tourEnd = new Date(period.end_date);
        const tourNights = Math.ceil(
          (tourEnd.getTime() - tourStart.getTime()) / (1000 * 60 * 60 * 24),
        );

        const roomCapacity = room.number_of_adults;

        const isNightsMatch = tourNights === nights;
        const isGuestsMatch = guests === roomCapacity;
        const isAvailable = period.available_for_booking;

        if (isNightsMatch && isGuestsMatch && isAvailable) {
          matchedRooms.push({
            tourId: tour.id,
            roomId: room.id,
            name: room.category,
            services: room.amenities_common ?? [],
            start_date: period.start_date,
            end_date: period.end_date,
            tour_operator: tour.tour_operator ?? 'Без оператора',
            price: String(period.price),
            guests,
            nights,
          });
        }
      });
    });

    setAllRooms(matchedRooms);
    setVisibleRooms(matchedRooms.slice(0, roomsToShow));
  }, [tour, tourId, searchProps.guests, searchProps.nights, roomsToShow]);

  if (isTourLoading) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...</div>;
  }

  if (!tourData) {
    return <div className='pt-[40px] text-center text-[32px]'>Данных нет.</div>;
  }

  if (isTourError) {
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
            label: `${tour?.arrival_country}, ${tour?.arrival_city}`,
            href: `/catalog-tours?where=${tour?.arrival_city}`,
          },
          {
            label: `${tour?.hotel.name}`,
            href: `/tour-page?where=${tour?.arrival_city}&hotelName=${tour?.hotel.name}&hotelId=${tour?.hotel.id}`,
          },
        ]}
      />
      {tour && (
        <>
          {searchProps.isInitialized && (
            <SearchTour
              hotel={{ ...tour.hotel, rooms: tour.rooms }}
              {...searchProps}
            />
          )}
          <ToursBlockPhoto hotel={{ ...tour.hotel, rooms: tour.rooms }} />
          <section className='mb-10 mt-10'>
            <OtherTours hotel={{ ...tour.hotel, rooms: tour.rooms }} />
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
        </>
      )}
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
