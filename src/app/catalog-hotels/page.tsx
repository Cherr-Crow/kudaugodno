'use client';
import React from 'react';

import { useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelRomsList } from '@/widgets/hotel-roms-list';
import { HotelRules } from '@/widgets/hotel-rules';

export default function CatalogHotels() {
  const { data, error, isLoading } = useGetHotelsQuery({ limit: 10, offset: 0 });

  if (isLoading) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...!!!</div>;
  }

  if (error || !data?.results) {
    return (
      <div className='text-red-600 pt-[40px] text-center text-[32px]'>
        Ошибка загрузки
      </div>
    );
  }

  return (
    <>
      {data.results.map((hotel) => {
        const rooms = hotel.rooms;
        const amenities = {
          common: hotel.amenities_common,
          children: hotel.amenities_for_children,
          in_the_room: hotel.amenities_in_the_room,
          sports_and_recreation: hotel.amenities_sports_and_recreation,
        };
        const rules = {
          rules: [...hotel.rules],
        };

        return (
          <section
            key={hotel.id}
            className='container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]'
          >
            <Breadcrumbs />
            <SearchTour type={'Туры'} />
            <HotelBlockPhotosReview hotel={hotel} />
            <HotelRomsList rooms={rooms} />
            <HotelAmenities amenities={amenities} />
            <HotelRules rules={rules} />
          </section>
        );
      })}
    </>
  );
}
