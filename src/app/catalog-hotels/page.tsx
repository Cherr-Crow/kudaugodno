'use client';
import React from 'react';

import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelRules } from '@/widgets/hotel-rules';
import { RoomModal } from '@/widgets/room-modal';
import { HotelRomsList } from '@/widgets/hotel-roms-list';

export default function CatalogHotels() {
    const hotelsData = [
    {
      id: 1,
      name: 'Номер Double',
      description: '1 ',
      quadrature: '24',
      amenities: 'Завтрак включен',
      price: 65000,
      images: [ 
        'Novotel-Nairobi-Westlands-photo-4.png',
        'Novotel-Nairobi-Westlands-photo-2.png',
        'Novotel-Nairobi-Westlands-photo-3.png',
      ],
    },
    {
      id: 2,
      name: 'Номер Double',
      description: '2 ',
      quadrature: '44',
      amenities: 'Завтрак и ужин включены',
      price: 85000,
      images: [ 
        'Novotel-Nairobi-Westlands-photo-4.png',
        'Novotel-Nairobi-Westlands-photo-2.png',
        'Novotel-Nairobi-Westlands-photo-3.png',
      ],
    },
    {
      id: 3,
      name: 'Номер Comfort',
      description: '1',
      quadrature: '30',
      amenities: 'Завтрак включен',
      price: 70000,
      images: [ 
        'Novotel-Nairobi-Westlands-photo-5.png',
        'Novotel-Nairobi-Westlands-photo-1.png',
        'Novotel-Nairobi-Westlands-photo-4.png',
      ],
    },
    {
      id: 4,
      name: 'Номер Comfort',
      description: '1 ',
      quadrature: '24',
      amenities: 'Завтрак и ужин включены',
      price: 70000,
      images: [
        'Novotel-Nairobi-Westlands-photo-3.png',
        'Novotel-Nairobi-Westlands-photo-1.png',
        'Novotel-Nairobi-Westlands-photo-4.png',
      ],
    },
    {
      id: 5,
      name: 'Номер Comfort',
      description: '1 ',
      quadrature: '24',
      amenities: 'Завтрак и ужин включены',
      price: 70000,
      images: [ 
        'Novotel-Nairobi-Westlands-photo-3.png',
        'Novotel-Nairobi-Westlands-photo-1.png',
        'Novotel-Nairobi-Westlands-photo-4.png',
      ],
    },
    {
      id: 6,
      name: 'Номер Comfort',
      description: '1 ',
      quadrature: '24',
      amenities: 'Завтрак и ужин включены',
      price: 70000,
      images: [ 
        'Novotel-Nairobi-Westlands-photo-3.png',
        'Novotel-Nairobi-Westlands-photo-1.png',
        'Novotel-Nairobi-Westlands-photo-4.png',
      ],
    },
    
  ];
  return (
    <>
      <section className='container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]'>
        <Breadcrumbs />
        {/*<SearchForm*/}
        {/*  className={'mb-[40px] border-solid shadow-lg xl:mb-[313px]'}*/}
        {/*  tabClick='Туры'*/}
        {/*/>*/}
        <SearchTour type={'Туры'} />
        <HotelBlockPhotosReview />
        <HotelAmenities />
        <HotelRules />
        <HotelRomsList hotels={hotelsData}/>
        <RoomModal />
      </section>
    </>
  );
}


