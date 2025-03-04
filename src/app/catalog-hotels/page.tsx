'use client';
import React from 'react';

// import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchTour } from '@/shared/ui/search-block/search-tour';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';
import { HotelRomsList } from '@/widgets/hotel-roms-list';
import { HotelRules } from '@/widgets/hotel-rules';

export default function CatalogHotels() {
  // const id = useSearchParams().get('id');
  // console.log(id);
  // const hotelsData = [
  //   {
  //     id: 1,
  //     name: 'Номер Double',
  //     description: '1 ',
  //     quadrature: '24',
  //     amenities: 'Завтрак включен',
  //     price: 65000,
  //     images: [
  //       'Novotel-Nairobi-Westlands-photo-4.png',
  //       'Novotel-Nairobi-Westlands-photo-2.png',
  //       'Novotel-Nairobi-Westlands-photo-3.png',
  //     ],
  //     hasChild: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Номер Double',
  //     description: '2 ',
  //     quadrature: '44',
  //     amenities: 'Завтрак и ужин включены',
  //     price: 85000,
  //     images: [
  //       'Novotel-Nairobi-Westlands-photo-4.png',
  //       'Novotel-Nairobi-Westlands-photo-2.png',
  //       'Novotel-Nairobi-Westlands-photo-3.png',
  //     ],
  //     hasChild: true,
  //   },
  //   {
  //     id: 3,
  //     name: 'Номер Comfort',
  //     description: '1',
  //     quadrature: '30',
  //     amenities: 'Завтрак включен',
  //     price: 70000,
  //     images: [
  //       'Novotel-Nairobi-Westlands-photo-5.png',
  //       'Novotel-Nairobi-Westlands-photo-1.png',
  //       'Novotel-Nairobi-Westlands-photo-4.png',
  //     ],
  //     hasChild: true,
  //   },
  // {
  //   id: 4,
  //   name: 'Номер Comfort',
  //   description: '1 ',
  //   quadrature: '24',
  //   amenities: 'Завтрак и ужин включены',
  //   price: 70000,
  //   images: [
  //     'Novotel-Nairobi-Westlands-photo-3.png',
  //     'Novotel-Nairobi-Westlands-photo-1.png',
  //     'Novotel-Nairobi-Westlands-photo-4.png',
  //   ],
  //   hasChild: true,
  // },
  // {
  //   id: 5,
  //   name: 'Номер Comfort',
  //   description: '1 ',
  //   quadrature: '24',
  //   amenities: 'Завтрак и ужин включены',
  //   price: 70000,
  //   images: [
  //     'Novotel-Nairobi-Westlands-photo-3.png',
  //     'Novotel-Nairobi-Westlands-photo-1.png',
  //     'Novotel-Nairobi-Westlands-photo-4.png',
  //   ],
  //   hasChild: true,
  // },
  // {
  //   id: 6,
  //   name: 'Номер Comfort',
  //   description: '1 ',
  //   quadrature: '24',
  //   amenities: 'Завтрак и ужин включены',
  //   price: 70000,
  //   images: [
  //     'Novotel-Nairobi-Westlands-photo-3.png',
  //     'Novotel-Nairobi-Westlands-photo-1.png',
  //     'Novotel-Nairobi-Westlands-photo-4.png',
  //   ],
  //   hasChild: true,
  // },
  // ];

  // const { hotelId } = useParams();
  // eslint-disable-next-line no-commented-code/no-commented-code
  const { data: hotel } = useGetOneHotelQuery(1);

  if (!hotel || hotel === undefined) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...!!!</div>;
  }
  console.log(hotel);

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
