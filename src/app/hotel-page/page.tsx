'use client';
import React, { useEffect, useState } from 'react';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelRomsList } from '@/widgets/hotel-roms-list';
import { HotelRules } from '@/widgets/hotel-rules';

export default function HotelPage() {
  const [id, setId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedId = localStorage.getItem('selectedHotelId');
    if (storedId) {
      const parsedId = parseInt(storedId, 10);
      if (!isNaN(parsedId)) {
        setId(parsedId);
      }
    }
  }, []);

  const { data: hotel, isLoading, isError } = useGetOneHotelQuery(id);

  if (!isClient) return null;
  if (isLoading || id === null) {
    return (
      <div className='pt-[40px] text-center text-[32px]'>Загрузка отеля...</div>
    );
  }
  if (isError || !hotel) {
    return (
      <div className='pt-[40px] text-center text-[32px]'>Ошибка загрузки отеля!</div>
    );
  }

  const rooms = hotel.rooms;
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
      <Breadcrumbs />
      {/* <SearchTour
         className={'mb-[40px] border-solid shadow-lg xl:mb-[313px]'}
         tabClick='Туры'
        /> */}
      <SearchTour type={'Туры'} />
      <HotelBlockPhotosReview hotel={hotel} />
      <HotelRomsList rooms={rooms} />
      <HotelAmenities amenities={amenities} />
      <HotelRules rules={rules} />
    </section>
  );
}
