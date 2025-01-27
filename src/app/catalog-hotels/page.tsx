'use client';
import React, { useState } from 'react';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchForm } from '@/shared/ui/search-form';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelRules } from '@/widgets/hotel-rules';
import { RoomModal } from '@/widgets/room-modal';
import { HotelRomsList } from '@/entities/hotel-roms-list';

export default function CatalogHotels() {
  const [tabClick, setTabClick] = useState<string>('Туры');
  const hotelsData: IHotelRoom[] = [
    {
      id: '1',
      name: 'Номер Double',
      description: 'Цена за.',
      images: ['Novotel-Nairobi-Westlands-photo-4.png', 'Novotel-Nairobi-Westlands-photo-2.png', 'Novotel-Nairobi-Westlands-photo-3.png'], // Замените на реальные URL
      size: '24 м²',
      bedType: 'Двуспальная кровать',
      breakfastIncluded: true,
      price: 65000, // Цена за 10 дней
    },

  ];


  return (
    <>
      <section className="container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]">
        <Breadcrumbs />
        <SearchForm
          className={'mb-[40px] border-solid shadow-lg xl:mb-[313px]'}
          tabClick={tabClick}
        />
        <HotelBlockPhotosReview /> 
        <HotelAmenities />
        <HotelRules />
        <HotelRomsList hotels={hotelsData} />
        <RoomModal/>
      </section>
    </>
  );
}
