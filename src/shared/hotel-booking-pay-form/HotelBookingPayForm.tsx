'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { IHotelBookingPayForm } from './HotelBookingPayForm.types';
import { HotelBookingModalCancel } from '../hotel-booking-modal-cancel';
import { Typography } from '../typography';
import { ButtonCustom } from '../ui/button-custom';
import { NamedInput } from '../ui/named-input';

export function HotelBookingPayForm({ data }: IHotelBookingPayForm) {
  const router = useRouter();

  const [promoCode, setPromoCode] = useState('');
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Финальная сумма бронирования
  const bookingPrice = {
    stayPrice: 22765,
    taxes: 765,
    discount: 765,
    bonuses: 238,
    totalPrice: 22765 + 765 - 765,
  };

  const finalBookingData = {
    hotelName: data.hotelName,
    checkInDate: data.checkInDate,
    checkOutDate: data.checkOutDate,
    guests: data.guests,
    guestsDetails: data.guestsDetails,
    phone: data.phone,
    email: data.email,
    wishes: data.wishes,
    med_insurance: data?.med_insurance,
    visa: data?.visa,
    cancellation_insurance: data?.cancellation_insurance,
    price: bookingPrice.stayPrice,
    stayPrice: bookingPrice.stayPrice,
    taxes: bookingPrice.taxes,
    discount: bookingPrice.discount,
    bonuses: bookingPrice.bonuses,
    totalPrice: bookingPrice.totalPrice,
    resortFee: data.resortFee,
    dates: data.dates,
    guestsInfo: data.guestsInfo,
    hotelAdress: data?.hotelAdress,
    hotelPhoneNumber: data?.hotelPhoneNumber,
    hotelEmail: data?.hotelEmail,
    tourOperator: data?.tourOperator,
    tourOperatorPhoneNumber: data?.tourOperatorPhoneNumber,
    tourOperatorEmail: data?.tourOperatorEmail,
    flightFrom: data?.flightFrom,
    flightTo: data?.flightTo,
    airCompany: data?.airCompany,
    cancellationPolicy: data?.cancellationPolicy,
    insurance: data?.insurance,
    tourId: data?.tourId,
    hotelId: data?.hotelId,
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCompleteBooking = () => {
    if (isClient) {
      localStorage.setItem('bookingData', JSON.stringify(finalBookingData));
      router.push('/booking-completed');
    }
  };

  const handlePromocode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  return (
    <div className='rounded-lg bg-white p-4 shadow-lg'>
      <div className='mb-4'>
        <Typography variant='l' className='font-bold text-grey-950'>
          Стоимость бронирования
        </Typography>
      </div>

      {/* Детализация цены */}
      <div className='mb-2 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Проживание
        </Typography>
        <Typography variant='m' className='text-grey-800'>
          {bookingPrice.stayPrice.toLocaleString()} ₽
        </Typography>
      </div>
      <div className='mb-2 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Налоги и сборы
        </Typography>
        <Typography variant='m' className='text-grey-800'>
          {bookingPrice.taxes.toLocaleString()} ₽
        </Typography>
      </div>
      <div className='mb-2 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Скидка
        </Typography>
        <Typography variant='m' className='text-[#FF0202]'>
          -{bookingPrice.discount.toLocaleString()} ₽
        </Typography>
      </div>
      <div className='mb-4 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Начислим бонусы
        </Typography>
        <Typography variant='m' className='text-grey-800'>
          {bookingPrice.bonuses.toLocaleString()} бонусов
        </Typography>
      </div>

      <div className='mb-4'>
        {/* Поле ввода промокода */}
        <div className='mb-4 flex w-full gap-2'>
          <div className='w-[70%]'>
            <NamedInput
              id='promo'
              name='Введите промокод'
              type='text'
              placeholder='Введите промокод'
              value={promoCode}
              onChange={handlePromocode}
            />
          </div>
          <ButtonCustom variant='secondary' className='px-2 lg:px-4' size='s'>
            Применить
          </ButtonCustom>
        </div>

        {/* Итоговая сумма */}
        <div className='border-gray-300 border-t pt-4'>
          <div className='flex justify-between'>
            <Typography variant='l' className='font-bold text-grey-950'>
              Итого
            </Typography>
            <Typography variant='l' className='font-bold text-grey-950'>
              {bookingPrice.totalPrice.toLocaleString()} ₽
            </Typography>
          </div>
        </div>
      </div>

      {/* Кнопки */}
      <div className='flex flex-col justify-between gap-4'>
        <ButtonCustom
          variant='primary'
          className='bg-lime-400 hover:bg-lime-500 w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
          size='s'
          onClick={handleCompleteBooking}
        >
          Завершить бронирование
        </ButtonCustom>

        <ButtonCustom
          variant='secondary'
          className='bg-lime-400 hover:bg-lime-500 w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
          size='s'
          onClick={() => setCancelModalOpen(true)}
        >
          Отменить бронирование
        </ButtonCustom>
      </div>

      <HotelBookingModalCancel
        isOpen={isCancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
      />
    </div>
  );
}
