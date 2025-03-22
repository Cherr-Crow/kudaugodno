'use client';

import React, { useEffect, useState } from 'react';

import { Typography } from '@/shared/typography';

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
  promoCode: string;
  phone: string;
  email: string;
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

  return (
    <div className='p-6'>
      <Typography variant='l' className='font-bold'>
        Бронирование завершено!
      </Typography>

      <Typography variant='m'>Данные бронирования:</Typography>
      <ul className='mt-4 space-y-2'>
        <li>
          <b>Имя отеля:</b> {bookingData.hotelName}
        </li>
        <li>
          <b>Email:</b> {bookingData.email}
        </li>
        <li>
          <b>Телефон:</b> {bookingData.phone}
        </li>
        <li>
          <b>Проживание:</b> {safeToLocaleString(bookingData.stayPrice)} ₽
        </li>
        <li>
          <b>Налоги и сборы:</b> {safeToLocaleString(bookingData.taxes)} ₽
        </li>
        <li>
          <b>Скидка:</b> -{safeToLocaleString(bookingData.discount)} ₽
        </li>
        <li>
          <b>Начисленные бонусы:</b> {safeToLocaleString(bookingData.bonuses)}
        </li>
        <li>
          <b>Промокод:</b> {bookingData.promoCode || 'Не указан'}
        </li>
        <li>
          <b>Итого:</b> {safeToLocaleString(bookingData.totalPrice)} ₽
        </li>
      </ul>
    </div>
  );
}
