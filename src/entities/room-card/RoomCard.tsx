/* eslint-disable react/no-children-prop */
'use client';
import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { ImageSlider } from '@/shared/hotel-page/image-slider';
import { RoomArea } from '@/shared/hotel-page/room-area';
import { RoomBedsInfo } from '@/shared/hotel-page/room-beds-info';
import { RoomMealsInfo } from '@/shared/hotel-page/room-meals-info';
import { NumberOfGuestsIcons } from '@/shared/number-of-guests-icons/NumberOfGuestsIcons';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Select } from '@/shared/ui/select';
import { Typography } from '@/shared/ui/typography';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';
import { getCheckOutDate } from '@/shared/utils/getCheckoutDate';
import { RoomType } from '@/types/room';

interface IRoomCardProps {
  room: RoomType;
  hotelId?: number | null;
}

const RoomCard: React.FC<IRoomCardProps> = ({ room, hotelId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [type, setType] = useState<string>('');
  const [hotelName, setHotelName] = useState<string>('');
  const [departureCity, setDepartureCity] = useState<string>('');
  const [where, setWhere] = useState<string>('');
  const [arrivalCountry, setArrivalCountry] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState('');
  const [nights, setNights] = useState('Количество ночей');
  const [guests, setGuests] = useState('Количество гостей');
  const [meals, setMeals] = useState<string>('Без питания');
  const [roomsQuantity, setRoomsQuantity] = useState<number>(1);

  const quantityOfRooms = Array.from({ length: room.quantity_rooms }, (_, i) =>
    String(i + 1),
  );

  useEffect(() => {
    setType(searchParams.get('type') || '');
    setHotelName(searchParams.get('hotelName') || '');
    setDepartureCity(searchParams.get('departureCity') || '');
    setWhere(searchParams.get('where') || '');
    setArrivalCountry(searchParams.get('arrivalCountry') || '');
    setCheckInDate(searchParams.get('checkInDate') || '');
    setNights(searchParams.get('nights') || 'Количество ночей');
    setGuests(searchParams.get('guests') || 'Количество гостей');
  }, [searchParams]);

  const handleBooking = () => {
    const searchData = {
      hotelId: hotelId ? hotelId.toString() : '',
      roomId: room.id ? room.id.toString() : '',
      type,
      hotelName,
      arrivalCountry,
      departureCity,
      where,
      checkInDate,
      nights,
      guests,
      meals,
      roomsQuantity: roomsQuantity.toString(),
    };
    localStorage.setItem('searchData', JSON.stringify(searchData));

    const url = type === 'Туры' ? '/tour-booking' : '/hotel-booking';
    router.push(`${url}?${new URLSearchParams(searchData).toString()}`);
  };

  const pluralRules = new Intl.PluralRules('ru-RU');

  const forms = {
    zero: 'ночей',
    one: 'ночь',
    two: 'ночи',
    few: 'ночи',
    many: 'ночей',
    other: 'ночей',
  };

  function getNightsDeclination(): string {
    const rule = pluralRules.select(Number(nights));
    const word = forms[rule];
    return `${nights} ${word}`;
  }

  const getDatesPeriod = () => {
    const start = new Date(checkInDate);
    const end = new Date(getCheckOutDate(checkInDate, nights));

    const startDay = start.getDate();
    const endDay = end.getDate();

    const monthFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
    });

    const month = monthFormatter.format(start).split(' ')[1];

    if (start.getMonth() !== end.getMonth()) {
      const endMonth = monthFormatter.format(end).split(' ')[1];
      return `${startDay} ${month} - ${endDay} ${endMonth}`;
    }

    return `${startDay}-${endDay} ${month}`;
  };

  console.log(room);

  return (
    <div className='relative w-full md:flex md:h-full md:min-h-[268px] md:p-5'>
      <Typography
        variant='l-bold'
        className='mb-5 block font-semibold text-blue-950 md:hidden'
      >{`Номер ${room.category}`}</Typography>

      <div className='slider relative mb-4 rounded-[20px] md:m-0 md:max-w-[267px] lg:max-w-[436px]'>
        <ImageSlider images={room.photo} />
      </div>

      <div className='rounded-[20px] border border-grey-50 p-5 text-blue-950 shadow-md md:h-full md:w-full md:border-none md:p-0 md:pl-5 md:shadow-none'>
        <Typography
          variant='l-bold'
          className='mb-5 hidden text-lg font-semibold text-blue-950 md:block lg:text-2xl'
        >{`Номер ${room.category}`}</Typography>

        <div className='md:flex md:min-h-[179px] md:flex-col md:justify-between'>
          <div className='mb-6 md:mb-0 md:flex md:flex-wrap md:items-start md:justify-between'>
            <div className='mb-4 md:mb-0'>
              <div className='mb-2 flex gap-4 md:hidden'>
                <Typography variant='m' className='text-black'>
                  Цена за
                </Typography>
                <NumberOfGuestsIcons
                  numOfAdults={room.number_of_adults}
                  numOfChildren={room.number_of_children}
                />
              </div>
              <RoomBedsInfo
                singleBeds={room.single_bed}
                duoBeds={room.double_bed}
                className='mb-2'
                textSettings='md:text-[13px] lg:max-w-none lg:text-[16px]'
                iconWidth='md:w-[20px] lg:w-[24px]'
              />
              <RoomArea
                area={room.area}
                className='mb-2 md:mb-0'
                textSettings='md:text-[13px] lg:text-[16px]'
                iconWidth='md:w-[20px] lg:w-[24px]'
              />
            </div>
            <NumberOfGuestsIcons
              numOfAdults={room.number_of_adults}
              numOfChildren={room.number_of_children}
              isCardLocation={true}
              className='hidden md:flex'
            />
            <RoomMealsInfo
              meals={room.type_of_meals}
              className='mb-2 w-[180px] text-center md:mb-0 md:max-w-[164px] lg:max-w-[180px]'
              onMealsChange={(value) => {
                setMeals(value), console.log(value);
              }}
            />
            <div className='mb-4 flex items-end justify-between gap-4 md:hidden'>
              <Typography variant='m' className='md:text-[13px] lg:text-[16px]'>
                Количество номеров
              </Typography>
              <div className='md:ml-0'>
                <Select
                  options={quantityOfRooms}
                  onSelect={(e) => {
                    setRoomsQuantity(Number(e));
                  }}
                  color='blue'
                  size='mobile'
                  className='max-w-[80px] text-[13px] md:max-w-[52px] lg:-translate-x-1/3'
                />
              </div>
            </div>
          </div>

          <div className='md:flex md:items-end md:justify-between'>
            <div className='hidden items-end justify-between gap-4 md:flex md:flex-col md:items-center md:gap-2 lg:gap-1'>
              <Typography variant='m' className='md:text-[13px] lg:text-[16px]'>
                Количество номеров
              </Typography>
              <div className='md:ml-0'>
                <Select
                  options={quantityOfRooms}
                  onSelect={(e) => {
                    setRoomsQuantity(Number(e)), console.log(e);
                  }}
                  color='blue'
                  size='mobile'
                  className='max-w-[80px] text-[13px] md:max-w-[52px] lg:-translate-x-1/3'
                />
              </div>
            </div>

            <div className='md:pl-[25px] lg:pl-[55px]'>
              <div className='mb-4 flex flex-row-reverse justify-between md:mb-0 md:flex-col md:items-center md:justify-center md:text-center md:align-middle lg:gap-4'>
                <Typography
                  variant='m-bold'
                  className='font-medium md:text-lg lg:text-xl'
                >
                  {formatNumberToPriceInRub(room.dates[0].price, 'word')}
                </Typography>

                <div className='md:text-nowrap'>
                  <Typography
                    variant='m'
                    className='hidden text-blue-950 md:mr-2 md:inline lg:text-xl'
                  >
                    {checkInDate ? getDatesPeriod() : '17-24 июля'}
                  </Typography>

                  <Typography className='lg:text-xl'>
                    <Typography className='md:hidden'>Цена за </Typography>
                    {nights ? getNightsDeclination() : '7 ночей'}
                  </Typography>
                </div>
              </div>
            </div>

            <ButtonCustom
              variant='primary'
              size='s'
              className='w-full md:w-auto lg:px-8 lg:py-3'
              onClick={handleBooking}
            >
              <Typography variant='m-bold' className='lg:text-xl'>
                Бронировать
              </Typography>
            </ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
