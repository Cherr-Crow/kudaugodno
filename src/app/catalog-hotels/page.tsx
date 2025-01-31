'use client';
import React from 'react';

import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelRules } from '@/widgets/hotel-rules';
import { RoomModal } from '@/widgets/room-modal';

export default function CatalogHotels() {
  return (
    <>
      <section className='container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]'>
        <Breadcrumbs />
        {/*<SearchForm*/}
        {/*  className={'mb-[40px] border-solid shadow-lg xl:mb-[313px]'}*/}
        {/*  tabClick='Туры'*/}
        {/*/>*/}
        <SearchTour />
        <HotelBlockPhotosReview />
        <HotelAmenities />
        <HotelRules />
        <RoomModal />
      </section>
    </>
  );
}
