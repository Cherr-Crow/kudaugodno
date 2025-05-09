import React, { useEffect, useState } from 'react';

import { Modal } from '@/shared/modal';
import { SelectForSearchBlock } from '@/shared/select-for-search-block';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { InputForSearchBlock } from '@/shared/ui/search-block/input-for-search-block';
import { Typography } from '@/shared/ui/typography';
import { getDateNow } from '@/shared/utils/getDateNow';

import { ISearchTour } from './SearchTour.types';

export function SearchTour({
  type,
  hotel,
  departureCity = '',
  where = '',
  checkInDate = `${getDateNow(+5)}`,
  checkOutDate = '',
  nights = '7 ночей',
  guests = '2 гостя',
  setDepartureCity,
  setWhere,
  setHotelName,
  setArrivalCountry,
  setCheckInDate,
  setCheckOutDate,
  setNights,
  setGuests,
}: ISearchTour) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errModal, setErrModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSetDepartureCity = (event: string) => {
    setDepartureCity?.(event);
  };

  const handleSetWhere = (event: string) => {
    setWhere?.(event);
  };

  const handleSetCheckInDate = (event: string) => {
    setCheckInDate?.(event);
  };

  const handleSetCheckOutDate = (event: string) => {
    setCheckOutDate?.(event);
  };

  const handleSetNights = (event: string) => {
    setNights?.(event === 'Количество ночей' ? '' : event);
  };

  const handleSetGuests = (event: string) => {
    setGuests?.(event === 'Количество гостей' ? '' : event);
  };

  const handleSearch = () => {
    const isValid = checkFormValidity();

    if (!isValid) {
      if (
        new Date(checkInDate).setHours(0, 0, 0, 0) >=
        new Date(checkOutDate).setHours(0, 0, 0, 0)
      ) {
        setErrorMessage('Дата прибытия не может быть позже даты отправления');
      } else {
        setErrorMessage('Пожалуйста, заполните все поля формы');
      }
      setErrModal(true);
      return;
    }

    setErrorMessage('');
    setErrModal(false);
  };

  // Check validity

  const checkFormValidity = () => {
    const checkInDateValid = checkInDate.trim() !== '';
    const nightsValid = nights.trim() !== '' && nights !== 'Количество ночей';
    const guestsValid = guests.trim() !== '' && guests !== 'Количество гостей';

    const isValidDates =
      new Date(checkInDate).setHours(0, 0, 0, 0) <
      new Date(checkOutDate).setHours(0, 0, 0, 0);

    const valid =
      where.trim() !== '' &&
      checkInDateValid &&
      nightsValid &&
      guestsValid &&
      (type !== 'Туры' || departureCity.trim() !== '') &&
      isValidDates;

    setIsFormValid(valid);
    return valid;
  };

  // Update SearchBlock, URL from hotel data

  useEffect(() => {
    if (hotel) {
      setWhere?.(hotel.city || '');
      setHotelName?.(hotel.name || '');
      setArrivalCountry?.(hotel.country || '');
    }
  }, [hotel]);

  // Check validity

  useEffect(() => {
    checkFormValidity();
  }, [checkInDate, checkOutDate, nights, guests, where, departureCity]);

  if (!isClient) return null;

  return (
    <div className='md:flex md:justify-center'>
      <div className='hidden h-full w-full max-w-[800px] gap-2 rounded-full border-solid bg-white py-1 pl-12 pr-1 shadow-lg md:flex md:justify-center'>
        {type === 'Туры' && (
          <InputForSearchBlock
            placeholder='Город вылета'
            value={departureCity}
            getValue={handleSetDepartureCity}
            className='border-r-2 border-grey-400'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          value={where}
          getValue={handleSetWhere}
          className='border-r-2 border-grey-400'
        />
        <InputDateForSearchBlock
          placeholder='Дата заезда'
          className='border-r-2 border-grey-400'
          startValue={checkInDate}
          getValue={handleSetCheckInDate}
        />
        <SelectForSearchBlock
          type='nights'
          className='border-r-2 border-grey-400'
          startValue={nights}
          getValue={handleSetNights}
        />
        <SelectForSearchBlock
          type='guests'
          className='border-r-2 border-grey-400'
          startValue={guests}
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
            value={departureCity}
            getValue={handleSetDepartureCity}
            className='col-span-2 w-full rounded-lg bg-white p-4'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          value={where}
          getValue={handleSetWhere}
          className='col-span-2 w-full rounded-lg bg-white p-4'
        />
        <SelectForSearchBlock
          type='nights'
          className='col-span-2 w-full rounded-lg bg-white px-4'
          startValue={nights}
          getValue={handleSetNights}
        />
        <SelectForSearchBlock
          type='guests'
          className='col-span-2 w-full rounded-lg bg-white px-4'
          startValue={guests}
          getValue={handleSetGuests}
        />
        <InputDateForSearchBlock
          placeholder='Дата заезда'
          className='w-full rounded-lg bg-white p-4'
          min={new Date().toISOString().split('T')[0]}
          startValue={checkInDate}
          getValue={handleSetCheckInDate}
        />
        <InputDateForSearchBlock
          placeholder='Дата выезда'
          className='w-full rounded-lg bg-white p-4'
          min={new Date().toISOString().split('T')[0]}
          startValue={checkOutDate}
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
      <Modal isOpen={errModal} getState={setErrModal} err>
        <ul>
          <li>
            <Typography>{errorMessage}</Typography>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
