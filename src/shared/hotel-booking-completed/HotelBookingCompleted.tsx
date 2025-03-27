'use client';

import React, { useEffect, useState } from 'react';

import { Typography } from '@/shared/typography';
import { hotels } from '@/temp/hotel-mock';

import { Rating } from '../rating';

interface BookingData {
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
  stayPrice: number;
  taxes: number;
  discount: number;
  bonuses: number;
  totalPrice: number;
  resortFee: number;
  dates: string;
  guestsInfo: string;
  tourId?: number;
  hotelId?: number;
}

export default function HotelBookingCompleted() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      try {
        setBookingData(JSON.parse(storedData));
        localStorage.removeItem('bookingData');
      } catch (error) {
        console.error('Ошибка парсинга данных бронирования:', error);
      }
    }
  }, []);

  if (!bookingData) return <Typography variant='l'>Загрузка...</Typography>;

  const safeToLocaleString = (value: number | undefined) =>
    value ? value.toLocaleString() : 'Не указано';

  const hotel = hotels.find((h) => h.id === bookingData.tourId);
  if (!hotel) {
    return <Typography variant='l'>Ошибка в загрузке данных</Typography>;
  }

  return (
    <div className='container rounded-lg bg-white p-4 shadow-lg'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-4 lg:gap-1'>
          <Rating category={hotel.star_category} starSize={16} gap={1} />
          <Typography variant='l' className='font-bold text-blue-950 md:text-lg'>
            {hotel.name}
          </Typography>
          <Typography variant='l' className='text-blue-950 md:text-sm'>
            {hotel.city}
          </Typography>
        </div>
        <div className='flex h-[65px] w-[130px] md:h-full md:w-[15%]'>
          <img
            src={hotel.photo?.[0]?.photo}
            alt='Image of Novotel Nairobi Westlands hotel with a pool and palm trees'
            className='mx-auto rounded-2xl'
          />
        </div>
      </div>
      <div className='mb-3 grid grid-cols-3 gap-2'>
        {hotel.amenities_common.map((amenity, amenityIndex) => (
          <Typography
            key={`amenity-${amenityIndex}`}
            variant='l-bold'
            className='rounded-xl bg-grey-50 p-1 text-xs text-grey-800 md:text-base'
          >
            {amenity}
          </Typography>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2 rounded-lg bg-blue-100 p-4'>
          <Typography variant='l' className='text-[14px] font-bold text-blue-950'>
            {bookingData.checkIn} - {bookingData.checkOut}
          </Typography>
          <Typography variant='m' className='text-blue-950'>
            Количество гостей: {bookingData.guests}
          </Typography>
          <Typography variant='m' className='text-blue-950'>
            {bookingData.guestsInfo}
          </Typography>
          <Typography variant='m' className='text-blue-950'>
            Контакты отеля: {safeToLocaleString(bookingData.totalPrice)}
          </Typography>
          <Typography variant='l' className='font-bold text-blue-950'>
            Необходимо оплатить при заселении{' '}
            {safeToLocaleString(bookingData.resortFee)} ₽
          </Typography>
          <Typography variant='l' className='font-bold text-blue-950'>
            К оплате {safeToLocaleString(bookingData.totalPrice)} ₽
          </Typography>
        </div>
      </div>
    </div>
  );
}
