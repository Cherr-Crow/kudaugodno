'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Typography } from '@/shared/typography';

interface BookingData {
  stayPrice: number;
  taxes: number;
  discount: number;
  bonuses: number;
  totalPrice: number;
}

export default function HotelBookingCompleted() {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        setBookingData(JSON.parse(decodeURIComponent(data)));
      } catch (error) {
        console.error('Ошибка парсинга данных:', error);
      }
    }
  }, [searchParams]);

  if (!bookingData) {
    return <Typography variant='l'>Загрузка данных...</Typography>;
  }

  return (
    <div className='p-6'>
      <Typography variant='l' className='font-bold'>
        Бронирование завершено!
      </Typography>
      <Typography variant='m'>Детали бронирования:</Typography>
      <ul className='mt-4 space-y-2'>
        <li>
          <b>Проживание:</b> {bookingData.stayPrice.toLocaleString()} ₽
        </li>
        <li>
          <b>Налоги и сборы:</b> {bookingData.taxes.toLocaleString()} ₽
        </li>
        <li>
          <b>Скидка:</b> -{bookingData.discount.toLocaleString()} ₽
        </li>
        <li>
          <b>Бонусы начислены:</b> {bookingData.bonuses.toLocaleString()}
        </li>
        <li>
          <b>Итого:</b> {bookingData.totalPrice.toLocaleString()} ₽
        </li>
      </ul>
    </div>
  );
}
