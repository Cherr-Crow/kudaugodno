import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SelectForSearchBlock } from '@/shared/select-for-search-block';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { InputForSearchBlock } from '@/shared/ui/search-block/input-for-search-block';

import { ISearchTour } from './SearchTour.types';

export function SearchTour({ type }: ISearchTour) {
  const router = useRouter();

  const [departureCity, setDepartureCity] = useState('');
  const [where, setWhere] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('Гостей');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSetDepartureCity = (event: string) => {
    setDepartureCity(event);
  };

  const handleSetWhere = (event: string) => {
    setWhere(event);
  };

  const handleSetCheckInDate = (event: string) => {
    setCheckInDate(event);
  };

  const handleSetCheckOutDate = (event: string) => {
    setCheckOutDate(event);
  };

  const handleSetGuests = (event: string) => {
    setGuests(event === 'Гостей' ? '' : event);
  };

  const handleSearch = () => {
    if (!isFormValid) return;

    const searchData = {
      departureCity,
      where,
      checkInDate,
      checkOutDate,
      guests,
    };

    if (isClient) {
      localStorage.setItem('searchData', JSON.stringify(searchData));
    }

    const url = type === 'Туры' ? '/tour-booking' : '/hotel-booking';
    router.push(url);
  };

  const checkFormValidity = () => {
    const checkInDateValid = checkInDate.trim() !== '';
    const checkOutDateValid = checkOutDate.trim() !== '';
    const guestsValid = guests.trim() !== '' && guests !== 'Гостей';

    const valid =
      where.trim() !== '' &&
      checkInDateValid &&
      checkOutDateValid &&
      guestsValid &&
      (type !== 'Туры' || departureCity.trim() !== '');

    setIsFormValid(valid);
    return valid;
  };

  useEffect(() => {
    checkFormValidity();
  }, [checkInDate, checkOutDate, guests, where, departureCity]);

  return (
    <div className='md:flex md:justify-center'>
      <div className='hidden h-full w-full max-w-[800px] gap-2 rounded-full border-solid bg-white py-1 pl-12 pr-1 shadow-lg md:flex md:justify-center'>
        {type === 'Туры' && (
          <InputForSearchBlock
            placeholder='Город вылета'
            getValue={handleSetDepartureCity}
            className='border-r-2 border-grey-400'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          getValue={handleSetWhere}
          className='border-r-2 border-grey-400'
        />
        <InputDateForSearchBlock
          placeholder='Дата заезда'
          className='border-r-2 border-grey-400'
          getValue={handleSetCheckInDate}
        />
        <InputDateForSearchBlock
          placeholder='Дата выезда'
          className='border-r-2 border-grey-400'
          getValue={handleSetCheckOutDate}
        />
        <SelectForSearchBlock
          className='border-r-2 border-grey-400'
          getValue={handleSetGuests}
        />
        <div className='flex items-center'>
          <ButtonCustom variant='primary' size='m' onClick={handleSearch}>
            <Typography variant='m-bold'>Найти</Typography>
          </ButtonCustom>
        </div>
      </div>
      <div className='grid w-full grid-cols-2 gap-x-4 gap-y-3 md:hidden'>
        {type === 'Туры' && (
          <InputForSearchBlock
            placeholder='Город вылета'
            getValue={handleSetDepartureCity}
            className='col-span-2 w-full rounded-lg bg-white p-4'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          getValue={handleSetWhere}
          className='col-span-2 w-full rounded-lg bg-white p-4'
        />
        <SelectForSearchBlock
          className='col-span-2 w-full rounded-lg bg-white px-4'
          getValue={handleSetGuests}
        />
        <InputDateForSearchBlock
          placeholder='Дата заезда'
          className='w-full rounded-lg bg-white p-4'
          min={new Date().toISOString().split('T')[0]}
          getValue={handleSetCheckInDate}
        />
        <InputDateForSearchBlock
          placeholder='Дата выезда'
          className='w-full rounded-lg bg-white p-4'
          min={new Date().toISOString().split('T')[0]}
          getValue={handleSetCheckOutDate}
        />
        <ButtonCustom
          variant='primary'
          size='m'
          onClick={handleSearch}
          disabled={!isFormValid}
          className='col-span-2 w-full'
        >
          <Typography variant='m-bold'>Найти</Typography>
        </ButtonCustom>
      </div>
    </div>
  );
}
