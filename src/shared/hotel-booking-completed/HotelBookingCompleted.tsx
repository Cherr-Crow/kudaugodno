'use client';

import React, { useEffect, useState } from 'react';

import { Typography } from '@/shared/typography';
import { hotels } from '@/temp/hotel-mock';

import { HotelBookingModalCancel } from '../hotel-booking-modal-cancel';
import { Rating } from '../rating';
import { ButtonCustom } from '../ui/button-custom';

interface BookingData {
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  price: number;
  stayPrice: number;
  taxes: number;
  discount: number;
  bonuses: number;
  totalPrice: number;
  resortFee?: number;
  dates: string;
  guestsInfo: string;
  hotelAdress?: string;
  hotelPhoneNumber?: string;
  hotelEmail?: string;
  tourOperator?: string;
  tourOperatorPhoneNumber?: string;
  tourOperatorEmail?: string;
  flightFrom?: string;
  flightTo?: string;
  airCompany?: string;
  insurance?: string;
  cancellationPolicy?: string;
  tourId?: number;
  hotelId?: number;
  type: 'hotel' | 'tour';
}

export default function HotelBookingCompleted() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('bookingData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);

          const type = parsedData.hotelId
            ? 'hotel'
            : parsedData.tourId
              ? 'tour'
              : null;

          setBookingData({ ...parsedData, type });
        } catch (error) {
          console.error('Ошибка парсинга данных бронирования:', error);
        }
      }
    }
  }, []);
  const handleBookingCompletion = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bookingData');
    }
    setCancelModalOpen(false);
  };

  if (!bookingData) return <Typography variant='l'>Загрузка...</Typography>;

  const safeToLocaleString = (value: number | undefined) =>
    value ? value.toLocaleString() : 'Не указано';

  const hotel =
    bookingData.type === 'hotel'
      ? hotels.find((h) => h.id === bookingData.hotelId)
      : hotels.find((h) => h.id === bookingData.tourId);

  if (!hotel) {
    return <Typography variant='l'>Ошибка в загрузке данных</Typography>;
  }

  return (
    <section className='relative mb-10'>
      {/* Фон */}
      <div
        className={`z-5 absolute left-0 top-0 h-full w-full rounded-bl-[20px] rounded-br-[20px] bg-blue-600 bg-[url("/plain.svg")] bg-no-repeat md:h-[90%] md:rounded-bl-[100px] md:rounded-br-[100px]`}
      ></div>
      <HotelBookingModalCancel
        isOpen={isCancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
      />
      <div className='container relative z-10'>
        <div className='relative translate-y-10 rounded-lg bg-white p-4 shadow-lg'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-4 lg:gap-1'>
              <Rating category={hotel.star_category} starSize={16} gap={1} />
              <Typography variant='l' className='font-bold text-grey-950'>
                {hotel.name}
              </Typography>
              <Typography variant='l' className='text-grey-950'>
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
          {bookingData.type === 'hotel' ? (
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2 rounded-lg bg-blue-100 p-4'>
                <Typography
                  variant='l'
                  className='text-[14px] font-bold text-grey-950'
                >
                  {bookingData.checkInDate} - {bookingData.checkOutDate}
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.guestsInfo}
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  Контакты отеля
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.hotelAdress}
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.hotelPhoneNumber}
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.hotelEmail}
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  Необходимо оплатить при заселении
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  Курортный сбор до {safeToLocaleString(bookingData.resortFee)} ₽ с
                  человека за ночь
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  К оплате
                </Typography>
                <Typography variant='l' className='font-bold text-blue-950'>
                  {safeToLocaleString(bookingData.totalPrice)} ₽
                </Typography>
              </div>

              <div className='buttons-container flex flex-wrap justify-between gap-6'>
                <div>
                  <ButtonCustom
                    variant='secondary'
                    className='bg-lime-400 hover:bg-lime-500 w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
                    size='s'
                    onClick={() => {
                      handleBookingCompletion();
                      setCancelModalOpen(true);
                    }}
                  >
                    Отменить бронирование
                  </ButtonCustom>
                </div>
                <div>
                  <ButtonCustom
                    variant='primary'
                    className='bg-lime-400 hover:bg-lime-500 w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
                    size='s'
                  >
                    Скачать документы
                  </ButtonCustom>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2 rounded-lg bg-blue-100 p-4'>
                <Typography
                  variant='l'
                  className='text-[14px] font-bold text-grey-950'
                >
                  {bookingData.checkInDate} - {bookingData.checkOutDate}
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.guestsInfo}
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.flightFrom} - {bookingData.flightTo}
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  Контакты туроператора
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.tourOperator}
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.tourOperatorPhoneNumber}
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.tourOperatorEmail}
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  Перелет
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.airCompany
                    ? `С перелетом, авиакомпания: ${bookingData.airCompany}`
                    : 'Без перелета'}
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  Страховка
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.insurance
                    ? `${bookingData.insurance}`
                    : 'Без страховки'}
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  Условия отмены
                </Typography>
                <Typography variant='l' className='text-grey-950'>
                  {bookingData.cancellationPolicy}
                </Typography>
                <Typography variant='l' className='font-bold text-grey-950'>
                  Стоимость тура
                </Typography>
                <Typography variant='l' className='font-bold text-blue-950'>
                  {safeToLocaleString(bookingData.totalPrice)} ₽
                </Typography>
              </div>

              <div className='buttons-container flex flex-wrap justify-between gap-6'>
                <div>
                  <ButtonCustom
                    variant='secondary'
                    className='bg-lime-400 hover:bg-lime-500 w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
                    size='s'
                  >
                    Связаться с туроператором
                  </ButtonCustom>
                </div>
                <div>
                  <ButtonCustom
                    variant='primary'
                    className='bg-lime-400 hover:bg-lime-500 w-full rounded-full py-3 text-sm font-bold text-grey-950 shadow-md'
                    size='s'
                  >
                    Скачать документы
                  </ButtonCustom>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
