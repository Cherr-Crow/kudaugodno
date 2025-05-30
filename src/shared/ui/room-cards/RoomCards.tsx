import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IRoomCards } from './RoomCards.types';
import { ButtonCustom } from '../button-custom';
import { NameSvg } from '../svg-sprite/SvgSprite.types';

export function RoomCards({
  tourId,
  roomId,
  name,
  services,
  start_date,
  end_date,
  tour_operator,
  price,
  flight_to,
  flight_from,
  guests,
}: IRoomCards) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [type, setType] = useState<string>('');
  const [hotelId, setHotelId] = useState<string>('');
  const [hotelName, setHotelName] = useState<string>('');
  const [departureCity, setDepartureCity] = useState<string>('');
  const [where, setWhere] = useState<string>('');
  const [arrivalCountry, setArrivalCountry] = useState<string>('');

  useEffect(() => {
    setType(searchParams.get('type') || '');
    setHotelId(searchParams.get('hotelId') || '');
    setHotelName(searchParams.get('hotelName') || '');
    setDepartureCity(searchParams.get('departureCity') || '');
    setWhere(searchParams.get('where') || '');
    setArrivalCountry(searchParams.get('arrivalCountry') || '');
  }, [searchParams]);

  const handleBooking = () => {
    const searchData = {
      type,
      tourId: String(tourId) || '',
      hotelId: String(hotelId) || '',
      roomId: String(roomId) || '',
      name: name || '',
      startDate: start_date || '',
      endDate: end_date || '',
      tourOperator: tour_operator || 'Без оператора',
      price: price ? String(price) : '',
      flightTo: flight_to || '',
      flightFrom: flight_from || '',
      nights: searchParams.get('nights') || '',
      guests: searchParams.get('guests') || '',
      checkInDate: start_date || '',
      checkOutDate: end_date || '',
      hotelName,
      departureCity,
      where,
      arrivalCountry,
    };
    localStorage.setItem('searchData', JSON.stringify(searchData));
    const url = '/tour-booking';
    router.push(`${url}?${new URLSearchParams(searchData).toString()}`);
  };

  return (
    <div className='mb-4 flex min-h-[194px] flex-col rounded-[20px] p-4 shadow-xl lg:flex-row lg:justify-between'>
      <div className='flex flex-col'>
        <Typography variant='h5' className='mb-4'>
          {name}
        </Typography>
        <div className='flex place-content-between items-center'>
          <div className='grid min-h-[72px] w-full gap-4 rounded-[20px] bg-[#EDEDED] p-5 align-middle lg:grid-cols-7'>
            {services.map((elem) => {
              return (
                <div className='flex items-center justify-start' key={nanoid()}>
                  <SvgSprite name={elem as NameSvg} width={24} className='mr-3' />
                  <Typography variant='s-bold' className='text-black text-nowrap'>
                    Должно было быть описание к иконке {elem}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div className='mt-3 grid grid-cols-2 lg:flex'>
          <Typography className='mr-5'>{`Туда ${start_date}`}</Typography>
          <Typography className='mr-5'>{`Обратно ${end_date}`}</Typography>
          <Typography className='mr-5'>{`Туроператор ${tour_operator}`}</Typography>
          <Typography className='mr-5'>{`На сколько ${(new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)}`}</Typography>
          <Typography className='mr-5'>{`Гости ${guests}`}</Typography>
        </div>
      </div>
      <div className='h-x[72px] grid rounded-[20px]'>
        <div className='flex items-center justify-end'>
          <ButtonCustom
            variant='primary'
            size='m'
            type='submit'
            className='mt-2 w-full xl:mt-0'
            style={{ gridArea: 'btnSubmit' }}
            onClick={handleBooking}
          >
            <Typography variant='s-bold'>
              {`${price}₽ за ${guests === 1 ? '1-го' : `${guests}-х`}`}
            </Typography>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
