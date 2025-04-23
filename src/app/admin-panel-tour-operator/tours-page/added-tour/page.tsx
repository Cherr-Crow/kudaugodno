'use client';
import React from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useGetFlightsQuery } from '@/servicesApi/flightsApi';
import { useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { Select } from '@/shared/ui/select';

export default function AddTourPage() {
  const router = useRouter();
  const { data: FlightData } = useGetFlightsQuery({});
  console.log(FlightData);
  const { data: HotelData } = useGetHotelsQuery({});
  // console.log(HotelData?.results.map((i) => i.city));
  // const [addHotel, setAddHotel] = useState(false);
  const [startDate, setStartDate] = useState<string>('12.12.2024');
  const [endDate, setEndDate] = useState<string>('12.12.2024');
  // const [flightTo, setFlightTo] = useState<string>('Москва');
  // const [flightFrom, setFlightFrom] = useState<string>('Египет');
  const [departureCountry, setDepartureCountry] = useState<string>('Россия');
  const [departureCity, setDepartureCity] = useState<string>('Москва');
  const [arrivalCountry, setArrivalCountry] = useState<string>('Египет');
  const [arrivalCity, setArrivalCity] = useState<string>('Шарм-Эль-Шейх');
  // const [choseFlight, setChoseFlight] = useState(data);
  // const [choseCategory, setChoseCategory] = useState<string>('Standart');

  // const handleDeleteHotel = () => {
  //   setAddHotel(false);
  // };
  const handleStartDate = (val: string) => {
    setStartDate(val);
  };
  const handleEndDate = (val: string) => {
    setEndDate(val);
  };
  const handleDepartureCountry = (val: string) => {
    setDepartureCountry(val);
  };
  const handleDepartureCity = (val: string) => {
    setDepartureCity(val);
  };
  const handleArrivalCountry = (val: string) => {
    setArrivalCountry(val);
  };
  const handleArrivalCity = (val: string) => {
    setArrivalCity(val);
  };
  // const handleChoseFlight = (val: any) => {
  //   setChoseFlight(val);
  // };
  // const handleChoseHotel = (val: string) => {
  //   setChoseHotel(val);
  // };
  // const handleChoseCategory = (val: string) => {
  //   setChoseCategory(val);
  // };
  // const handleSumOfHotelRooms = (val: string) => {
  //   setSumOFHotelRooms(val);
  // };
  const handleBack = () => {
    router.back();
  };
  const handleSave = async () => {};

  const hotelOptions =
    HotelData?.results.map((hotel) => {
      const { name } = hotel;
      return `${name}`;
    }) || [];

  const hotelCategories =
    HotelData?.results.flatMap((hotel) => {
      const categories = hotel.rooms.map((room) => {
        const { category } = room;
        return `${category}`;
      });
      return categories;
    }) || [];

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  const flightOptions =
    FlightData?.map((flight) => {
      const {
        departure_time,
        arrival_time,
        flight_type,
        flight_number,
        airline,
        departure_city,
        departure_airport,
        arrival_city,
        arrival_airport,
      } = flight;

      return `${formatTime(departure_time)} — ${formatTime(arrival_time)}, ${flight_type}, ${flight_number} ${airline}, ${departure_city}, ${departure_airport} - ${arrival_city}, ${arrival_airport}`;
    }) || [];

  return (
    <div className='w-full'>
      <div>
        <div className='mx-auto mb-0 mt-0 max-w-6xl'>
          <Typography className='text-blue-950' variant='subtitle3'>
            Тур #999
          </Typography>
          <div className='mb-6 mt-5 rounded-2xl border border-grey-100 p-10 shadow-lg'>
            <div className='mb-5 flex flex-col gap-3'>
              <Typography variant='l-bold'>Дата отъезда</Typography>
              <InputDateForSearchBlock
                placeholder='12.12.2024'
                getValue={(val) => handleStartDate(val as string)}
                className='rounded-md border border-grey-700 py-5'
                startValue={startDate}
              />
            </div>
            <div className='mb-5 grid grid-cols-2 grid-rows-1 gap-5'>
              <div className='flex w-full flex-col gap-3'>
                <Typography variant='l'>Страна отправления</Typography>
                <Select
                  size='small'
                  color='blue'
                  options={['Россия']}
                  className='w-full'
                  getValue={handleDepartureCountry}
                  startValue={departureCountry}
                />
              </div>
              <div className='flex w-full flex-col gap-3'>
                <Typography variant='l'>Город</Typography>
                <Select
                  size='small'
                  color='blue'
                  options={['Москва']}
                  className='w-full'
                  getValue={handleDepartureCity}
                  startValue={departureCity}
                />
              </div>
            </div>
            <div className='mb-5 flex w-full flex-col gap-3'>
              <Typography variant='l'>Рейсы отправления</Typography>
              <Select
                size='small'
                color='blue'
                options={flightOptions}
                className='w-full'
                // getValue={(val) => handleChoseFlight(val as string)}
                // startValue={choseFlight?.[0].airline}
              />
            </div>
            <div className='mb-5 flex flex-col gap-3'>
              <Typography variant='l-bold'>Дата приезда</Typography>
              <InputDateForSearchBlock
                placeholder='12.12.2024'
                getValue={(val) => handleEndDate(val as string)}
                className='rounded-md border border-grey-700 py-5'
                startValue={endDate}
              />
            </div>
            <div className='mb-5 grid grid-cols-2 grid-rows-1 gap-5'>
              <div className='flex w-full flex-col gap-3'>
                <Typography variant='l'>Страна приезда</Typography>
                <Select
                  size='small'
                  color='blue'
                  options={['Египет']}
                  className='w-full'
                  getValue={handleArrivalCountry}
                  startValue={arrivalCountry}
                />
              </div>
              <div className='flex w-full flex-col gap-3'>
                <Typography variant='l'>Город</Typography>
                <Select
                  size='small'
                  color='blue'
                  options={['Шарм-Эль-Шейх']}
                  className='w-full'
                  getValue={handleArrivalCity}
                  startValue={arrivalCity}
                />
              </div>
            </div>
            <div className='flex w-full flex-col gap-3'>
              <Typography variant='l'>Рейсы отправления</Typography>
              <Select
                size='small'
                color='blue'
                options={flightOptions}
                className='w-full'
                // getValue={handleCityOfArrived}
                // startValue={cityOfArrived}
              />
            </div>
          </div>
          <div className='mb-6 mt-5 gap-5 rounded-2xl border border-grey-100 p-10 shadow-lg'>
            <div
              className='flex w-fit cursor-pointer justify-self-end'
              // onClick={handleDeleteHotel}
            >
              <SvgSprite name='trash-light' width={21} height={21} />
            </div>
            <div className='flex w-full flex-col gap-3'>
              <Typography variant='l'>Отель</Typography>
              <Select
                size='small'
                color='blue'
                options={hotelOptions}
                className='mb-5 w-full'
                // getValue={handleChoseHotel}
                // startValue={hotelOptions}
              />
            </div>
            <div className='mb-3 mb-5 flex'>
              <Checkbox id='' />
              <label className='text-[16px]' htmlFor=''>
                Доступен трансфер
              </label>
            </div>
            <div className='flex w-full flex-col gap-3'>
              <Typography variant='l'>Категория номера</Typography>
              <Select
                size='small'
                color='blue'
                options={hotelCategories}
                className='w-full'
                // getValue={handleChoseCategory}
                // startValue={choseCategory}
              />
            </div>
          </div>
          <div className='mb-6 mt-5 gap-5 rounded-2xl border border-grey-100 p-10 shadow-lg'>
            <Typography variant='l'>Итоговая сумма тура</Typography>
            <Typography variant='l'>взрослый: 133 500 ₽</Typography>
            <Typography variant='l'>ребенок: 133 500 ₽</Typography>
          </div>
          <div className='mt-6 flex gap-4 justify-self-end'>
            <ButtonCustom variant='secondary' size='l' onClick={handleBack}>
              <Typography variant='l-bold'>Отменить</Typography>
            </ButtonCustom>
            <ButtonCustom variant='primary' size='l' onClick={handleSave}>
              <Typography variant='l-bold'>Сохранить</Typography>
            </ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
}
