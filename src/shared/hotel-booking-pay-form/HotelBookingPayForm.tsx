'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAddApplicationMutation } from '@/servicesApi/applicationsApi';
import { useGetDiscountByTourIdQuery } from '@/servicesApi/discountApi';

import { IHotelBookingPayForm } from './HotelBookingPayForm.types';
import { HotelBookingModalCancel } from '../hotel-booking-modal-cancel';
import { ButtonCustom } from '../ui/button-custom';
import { NamedInput } from '../ui/named-input';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';
import { formatNumberToPriceInRub } from '../utils/formatNumberToPriceInRub';

export function HotelBookingPayForm({ data }: IHotelBookingPayForm) {
  const router = useRouter();

  const [promoCode, setPromoCode] = useState('');
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDiscountDetailsOpen, setDiscountDetailsOpen] = useState(false);
  const [addApplication] = useAddApplicationMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);
  const searchParams = useSearchParams();

  const [type, setType] = useState<string>('');
  const [hotelId, setHotelId] = useState<string>('');
  const [hotelName, setHotelName] = useState<string>('');
  const [arrivalCountry, setArrivalCountry] = useState<string>('');
  const [departureCity, setDepartureCity] = useState<string>('');
  const [where, setWhere] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [nights, setNights] = useState('Количество ночей');
  const [guests, setGuests] = useState('Количество гостей');

  useEffect(() => {
    setType(searchParams.get('type') || '');
    setHotelId(searchParams.get('hotelId') || '');
    setHotelName(searchParams.get('hotelName') || '');
    setDepartureCity(searchParams.get('departureCity') || '');
    setWhere(searchParams.get('where') || '');
    setArrivalCountry(searchParams.get('arrivalCountry') || '');
    setCheckInDate(searchParams.get('checkInDate') || '');
    setCheckOutDate(searchParams.get('checkOutDate') || '');
    setNights(searchParams.get('nights') || 'Количество ночей');
    setGuests(searchParams.get('guests') || 'Количество гостей');
  }, [searchParams]);

  const tourId = data?.tour?.id;
  const room = data.hotel?.rooms.find((room) => room.id === data.roomId);

  const nightsNum = Number(nights) || 1;
  const guestsNum = Number(guests) || 1;

  const todayISO = new Date().toISOString().split('T')[0];

  const { data: discountData, isLoading } = useGetDiscountByTourIdQuery(tourId!, {
    skip: !tourId,
  });

  const rawTourDiscount =
    discountData?.active_stock && todayISO <= discountData?.end_date
      ? Math.abs(Number(discountData.discount_amount))
      : 0;

  const roomDateWithStock = room?.dates.find(
    (d) => d.stock && todayISO >= d.start_date && todayISO <= d.end_date,
  );
  const rawRoomDiscount =
    roomDateWithStock && roomDateWithStock.share_size
      ? Math.abs(Number(roomDateWithStock.share_size))
      : 0;

  const stayPrice = data.tour?.price ?? room?.dates[0].price ?? 0;
  const taxes = 0;
  const promoDiscount = 0;
  const resortFee = (data.resortFee || 0) * nightsNum * guestsNum;

  const isTourBooking = type.toLowerCase() === 'туры';
  const rawDiscount = isTourBooking ? rawTourDiscount : rawRoomDiscount;
  const isPercentDiscount = rawDiscount > 0 && rawDiscount < 1;
  const discount = isPercentDiscount
    ? stayPrice * rawDiscount + promoDiscount
    : rawDiscount + promoDiscount;

  const subtotal = stayPrice + taxes + resortFee;
  const totalPrice = Math.max(subtotal - discount, 0);

  const bookingPrice = {
    stayPrice,
    taxes,
    resortFee,
    discount,
    totalPrice,
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
    price: stayPrice,
    stayPrice: stayPrice,
    taxes: taxes,
    discount: discount,
    totalPrice: totalPrice,
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

  const handleCompleteBooking = async () => {
    if (isClient) {
      try {
        const searchData = {
          type,
          hotelId,
          hotelName,
          departureCity,
          where,
          arrivalCountry,
          checkInDate,
          checkOutDate,
          nights,
          guests,
        };

        const response = await addApplication(applicationData).unwrap();
        console.log('Заявка успешно создана:', response);
        localStorage.setItem('bookingData', JSON.stringify(finalBookingData));

        let path = '/booking-completed';
        if (finalBookingData?.tourId) {
          path = '/tour-booking-completed';
        } else if (finalBookingData?.hotelId) {
          path = '/hotel-booking-completed';
        }

        router.push(`${path}?${new URLSearchParams(searchData).toString()}`);
      } catch (error) {
        console.error('Ошибка при создании заявки:', error);
      }
    }
  };

  const handlePromocode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  return (
    <div className='rounded-[20px] bg-white p-4 shadow-lg'>
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
          {formatNumberToPriceInRub(Math.ceil(bookingPrice.stayPrice))}
        </Typography>
      </div>
      <div className='mb-2 flex justify-between'>
        <Typography variant='m' className='text-grey-800'>
          Налоги и сборы
        </Typography>
        <Typography variant='m' className='text-grey-800'>
          {formatNumberToPriceInRub(
            Math.ceil(bookingPrice.taxes + bookingPrice.resortFee),
          )}
        </Typography>
      </div>
      {isLoading ? (
        <div className='mb-2 flex justify-between'>
          <Typography variant='m' className='text-grey-800'>
            Скидка
          </Typography>
          <Typography variant='m' className='animate-pulse text-grey-800'>
            ...
          </Typography>
        </div>
      ) : bookingPrice.discount !== 0 ? (
        <div
          className='mb-2 flex cursor-pointer justify-between'
          onClick={() => setDiscountDetailsOpen((prev) => !prev)}
        >
          <div className='flex items-center gap-1'>
            <Typography variant='m' className='text-grey-800'>
              Скидка
            </Typography>

            <SvgSprite
              name='arrow'
              className={`transition-transform duration-300 ${isDiscountDetailsOpen ? '-rotate-90' : 'rotate-90'}`}
              width={12}
              height={12}
            />
          </div>
          <Typography variant='m' className='text-[#FF0202]'>
            -{formatNumberToPriceInRub(Math.ceil(bookingPrice.discount))}
          </Typography>
        </div>
      ) : null}
      {isDiscountDetailsOpen && (
        <div className='mb-5 space-y-1 rounded-[8px] bg-grey-50 px-3 py-2 text-sm text-grey-700'>
          <div className='flex justify-between'>
            <Typography variant='s'>
              Скидка {isTourBooking ? 'туроператора' : 'отельера'}
            </Typography>
            <Typography variant='s'>
              {formatNumberToPriceInRub(Math.ceil(bookingPrice.discount))}
            </Typography>
          </div>
          {promoCode && (
            <div className='flex justify-between'>
              <Typography variant='s'>Промокод</Typography>
              <Typography variant='s'>-0 ₽</Typography> {/* пока без логики */}
            </div>
          )}
        </div>
      )}
      <div className='mb-4'>
        {/* Поле ввода промокода */}
        <div className='mb-4 flex w-full gap-2'>
          <div className='w-[70%]'>
            <NamedInput
              id='promo'
              className='border-gray-600'
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
        <div className='border-gray-100 border-t pt-4'>
          <div className='flex justify-between'>
            <Typography variant='l' className='font-bold text-grey-950'>
              Итого
            </Typography>
            <Typography variant='l' className='font-bold text-grey-950'>
              {formatNumberToPriceInRub(Math.ceil(bookingPrice.totalPrice))}
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
