import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Modal } from '@/shared/modal';
import { SelectForSearchBlock } from '@/shared/select-for-search-block';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { InputForSearchBlock } from '@/shared/ui/search-block/input-for-search-block';

import { ISearchTour } from './SearchTour.types';

export function SearchTour({ type, hotel }: ISearchTour) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [departureCity, setDepartureCity] = useState<string>('');
  const [where, setWhere] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('Гостей');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errModal, setErrModal] = useState(false);

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
    const checkOutDateValid = checkOutDate.trim() !== '';
    const guestsValid = guests.trim() !== '' && guests !== 'Гостей';

    const isValidDates =
      new Date(checkInDate).setHours(0, 0, 0, 0) <
      new Date(checkOutDate).setHours(0, 0, 0, 0);

    const valid =
      where.trim() !== '' &&
      checkInDateValid &&
      checkOutDateValid &&
      guestsValid &&
      (type !== 'Туры' || departureCity.trim() !== '') &&
      isValidDates;

    setIsFormValid(valid);
    return valid;
  };

  // Fill URL with search data

  useEffect(() => {
    setDepartureCity(searchParams.get('departureCity') || '');
    setWhere(searchParams.get('where') || '');
    setCheckInDate(searchParams.get('checkInDate') || '');
    setCheckOutDate(searchParams.get('checkOutDate') || '');
    setGuests(searchParams.get('guests') || 'Гостей');
  }, [searchParams]);

  // Auto Update URL

  useEffect(() => {
    if (!isClient) return;

    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (hotel?.id) params.set('hotelId', String(hotel.id));
    if (hotel?.name) params.set('name', hotel.name);
    if (departureCity) params.set('departureCity', departureCity);
    if (where) params.set('where', where);
    if (checkInDate) params.set('checkInDate', checkInDate);
    if (checkOutDate) params.set('checkOutDate', checkOutDate);

    const guestsCount = parseInt(guests);
    if (!isNaN(guestsCount) && guestsCount > 0) {
      params.set('guests', String(guestsCount));
    }

    const query = params.toString();
    const path = `${window.location.pathname}?${query}`;

    router.replace(path);
  }, [
    type,
    hotel?.id,
    hotel?.name,
    departureCity,
    where,
    checkInDate,
    checkOutDate,
    guests,
    isClient,
  ]);

  // Delete ULR data when inputs are empty

  useEffect(() => {
    if (!departureCity) {
      setDepartureCity('');
    }
  }, [departureCity]);

  useEffect(() => {
    if (!where) {
      setWhere('');
    }
  }, [where]);

  useEffect(() => {
    if (!checkInDate) {
      setCheckInDate('');
    }
  }, [checkInDate]);

  useEffect(() => {
    if (!checkOutDate) {
      setCheckOutDate('');
    }
  }, [checkOutDate]);

  useEffect(() => {
    if (guests === 'Гостей') {
      setGuests('Гостей');
    }
  }, [guests]);

  // Update SearchBlock, URL from hotel data

  useEffect(() => {
    if (hotel) {
      setWhere(hotel.city);
    }
  }, [hotel]);

  // Check validity

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
          value={where}
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
