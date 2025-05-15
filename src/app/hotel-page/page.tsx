'use client';
import React, { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { getDateNow } from '@/shared/utils/getDateNow';
import { useSearchBlockState } from '@/shared/utils/useSearchBlockState';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelRoomsList } from '@/widgets/hotel-rooms-list';
import { HotelRules } from '@/widgets/hotel-rules';

function HotelPageContent() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hotelId = Number(searchParams.get('hotelId')) ?? null;
  const { data: hotel, isLoading, isError } = useGetOneHotelQuery(hotelId);
  const [filteredRooms, setFilteredRooms] = useState(hotel?.rooms || []);
  // Инициализация компонента стейтов для SearchTour
  const searchState = useSearchBlockState({
    defaultCheckInDate: `${getDateNow(+5)}`,
    defaultNights: '7 ночей',
    defaultGuests: '2 гостя',
    defaultType: 'Отели',
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

  // Фильтрация номеров по количеству гостей
  useEffect(() => {
    if (hotel) {
      const guests = parseInt(searchProps.guests);

      if (!guests) {
        setFilteredRooms(hotel.rooms);
        return;
      }
      const filtered = hotel.rooms.filter((room) => {
        const roomCapacity = room.number_of_adults;
        return guests === roomCapacity;
      });

      setFilteredRooms(filtered);
    }
  }, [hotel, searchProps.guests, searchProps.nights]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  if (isLoading || hotelId === null) {
    return (
      <div className='pt-[40px] text-center text-[32px]'>Загрузка отеля...</div>
    );
  }
  if (isError || !hotel) {
    return (
      <div className='pt-[40px] text-center text-[32px]'>Ошибка загрузки отеля!</div>
    );
  }

  const amenities = {
    common: hotel.amenities_common,
    children: hotel.amenities_for_children,
    in_the_room: hotel.amenities_in_the_room,
    sports_and_recreation: hotel.amenities_sports_and_recreation,
  };

  const rules = {
    rules: Array.isArray(hotel.rules) ? hotel.rules : [],
  };

  return (
    <section className='container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]'>
      <Breadcrumbs
        paths={[
          { label: 'Отели', href: '/catalog-hotels' },
          {
            label: `${hotel.country}, ${hotel.city}`,
            href: `/catalog-hotels?where=${hotel.city}`,
          },
          {
            label: `${hotel.name}`,
            href: `/hotel-page?where=${hotel.city}&hotelName=${hotel.name}&hotelId=${hotel.id}`,
          },
        ]}
      />
      {searchProps.isInitialized && (
        <SearchTour
          className={'mb-[40px] border-solid shadow-lg xl:mb-[313px]'}
          hotel={hotel}
          {...searchProps}
        />
      )}
      <HotelBlockPhotosReview hotel={hotel} />
      <HotelRoomsList hotelId={hotel.id} rooms={filteredRooms} />
      <HotelAmenities amenities={amenities} />
      <HotelRules rules={rules} />
    </section>
  );
}

export default function HotelPage() {
  return (
    <Suspense
      fallback={
        <div className='pt-[40px] text-center text-[32px]'>Загрузка отеля...</div>
      }
    >
      <HotelPageContent />
    </Suspense>
  );
}
