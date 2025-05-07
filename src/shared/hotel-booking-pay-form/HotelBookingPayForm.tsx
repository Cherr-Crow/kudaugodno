'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAddApplicationMutation } from '@/servicesApi/applicationsApi';

import { IHotelBookingPayForm } from './HotelBookingPayForm.types';
import { HotelBookingModalCancel } from '../hotel-booking-modal-cancel';
import { ButtonCustom } from '../ui/button-custom';
import { NamedInput } from '../ui/named-input';
import { Typography } from '../ui/typography';

export function HotelBookingPayForm({ data }: IHotelBookingPayForm) {
  const router = useRouter();

  const [promoCode, setPromoCode] = useState('');
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [addApplication] = useAddApplicationMutation();

  const room = data.hotel?.rooms.find((room) => room.id === data.roomId);
  // Финальная сумма бронирования
  const bookingPrice = {
    stayPrice: data.tour?.price ?? room?.price ?? 0,
    taxes: 0,
    discount: 0,
    bonuses: 0,
    totalPrice: (data.tour?.price ?? room?.price ?? 0) + 0 - 0,
  };

  const finalBookingData = {
    tourId: data?.tour?.id,
    hotelId: data?.hotel?.id,
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
    departureCountry: data?.departureCountry,
    departureCity: data?.departureCity,
    arrivalCountry: data?.arrivalCountry,
    arrivalCity: data?.arrivalCity,
    airCompany: data?.airCompany,
    cancellationPolicy: data?.cancellationPolicy,
    insurance: data?.insurance,
  };

  const applicationData = {
    tour: data?.tour?.id ?? 1,
    email: data?.email || 'user@example.com',
    phone_number: data?.phone || '+7 999 978 22 22',
    quantity_guests: [data?.guests || 1],
    visa: Boolean(data?.visa),
    med_insurance: Boolean(data?.med_insurance),
    cancellation_insurance: Boolean(data?.cancellation_insurance),
    wishes: data?.wishes || 'Без пожеланий',
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCompleteBooking = async () => {
    if (isClient) {
      try {
        const response = await addApplication(applicationData).unwrap();
        console.log('Заявка успешно создана:', response);
        localStorage.setItem('bookingData', JSON.stringify(finalBookingData));
        router.push('/booking-completed');
      } catch (error) {
        console.error('Ошибка при создании заявки:', error);
      }
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
          {bookingPrice.stayPrice !== undefined
            ? bookingPrice.stayPrice.toLocaleString()
            : 'Неизвестная цена'}{' '}
          ₽
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
      {bookingPrice.discount !== 0 && (
        <div className='mb-2 flex justify-between'>
          <Typography variant='m' className='text-grey-800'>
            Скидка
          </Typography>
          <Typography variant='m' className='text-[#FF0202]'>
            -{bookingPrice.discount.toLocaleString()} ₽
          </Typography>
        </div>
      )}
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
