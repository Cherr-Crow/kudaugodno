'use client';
import React from 'react';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelRomsList } from '@/widgets/hotel-roms-list';
import { HotelRules } from '@/widgets/hotel-rules';

export default function CatalogHotels() {
  const { data: hotel } = useGetOneHotelQuery(1);

  if (!hotel || hotel === undefined) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...!!!</div>;
  }

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
    <>
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
    </>
  );
}
