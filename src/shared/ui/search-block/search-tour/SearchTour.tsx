'use client';
import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Modal } from '@/shared/modal';
import { SelectForSearchBlock } from '@/shared/select-for-search-block';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { InputForSearchBlock } from '@/shared/ui/search-block/input-for-search-block';
import { Typography } from '@/shared/ui/typography';
import { getDateNow } from '@/shared/utils/getDateNow';
import { getNumericValue } from '@/shared/utils/getNumericValue';

import { ISearchTour } from './SearchTour.types';
import { InputForSearchBlockRef } from '../input-for-search-block/InputForSearchBlock';

export function SearchTour({
  type,
  hotel,
  departureCity = 'Москва',
  where = 'Турция',
  checkInDate = `${getDateNow(+5)}`,
  nights = '7 ночей',
  guests = '2 гостя',
  setDepartureCity,
  setWhere,
  setHotelName,
  setArrivalCountry,
  setCheckInDate,
  setNights,
  setGuests,
}: ISearchTour) {
  const [isClient, setIsClient] = useState(false);
  const [errorMessage] = useState<string>('');
  const [errModal, setErrModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Локальное состояние
  const [localDepartureCity, setLocalDepartureCity] = useState(departureCity);
  const [localWhere, setLocalWhere] = useState(where);
  const [localCheckInDate, setLocalCheckInDate] = useState(checkInDate);
  const [localNights, setLocalNights] = useState(nights);
  const [localGuests, setLocalGuests] = useState(guests);

  const departureRef = useRef<InputForSearchBlockRef>(null);
  const whereRef = useRef<InputForSearchBlockRef>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const nightsRef = useRef<HTMLInputElement>(null);
  const guestsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check validity

  const router = useRouter();

  const checkFormValidity = () => {
    const checkInDateValid = localCheckInDate.trim() !== '';
    const nightsValid = localNights.trim() !== '' && localNights !== 'Ночей';
    const guestsValid = localGuests.trim() !== '' && localGuests !== 'Гостей';

    const valid =
      localWhere.trim() !== '' &&
      checkInDateValid &&
      nightsValid &&
      guestsValid &&
      (type !== 'Туры' || localDepartureCity.trim() !== '');

    return valid;
  };

  const focusNextEmptyInput = () => {
    const inputs = Array.from(
      document.querySelectorAll<HTMLInputElement>('#search-tour-search-bar input'),
    );

    const nextEmpty = inputs.find((inp) => inp.value.trim() === '');
    if (nextEmpty) {
      nextEmpty.focus();
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    const isValid = checkFormValidity();

    if (!isValid) {
      if (type === 'Туры' && !localDepartureCity.trim()) {
        departureRef.current?.focusInput();
        focusNextEmptyInput();
        return;
      }
      if (!localWhere.trim()) {
        whereRef.current?.focusInput();
        focusNextEmptyInput();
        return;
      }
      if (!localCheckInDate.trim()) {
        dateRef.current?.focus();
        focusNextEmptyInput();
        return;
      }
      if (!localNights.trim() || localNights === 'Ночей') {
        nightsRef.current?.focus();
        focusNextEmptyInput();
        return;
      }
      if (!localGuests.trim() || localGuests === 'Гостей') {
        guestsRef.current?.focus();
        focusNextEmptyInput();
        return;
      }
    }

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isSubmitted) return;

    setDepartureCity?.(localDepartureCity);
    setWhere?.(localWhere);
    setCheckInDate?.(localCheckInDate);
    setNights?.(localNights);
    setGuests?.(localGuests);

    // Переход по URL
    const queryParams = new URLSearchParams({
      where: localWhere,
      nights: String(getNumericValue(localNights)),
      guests: String(getNumericValue(localGuests)),
      checkInDate: localCheckInDate,
      ...(type === 'Туры' && { departureCity: localDepartureCity }),
    });

    const targetPath =
      type === 'Туры'
        ? `/catalog?tab=Туры&${queryParams.toString()}`
        : `/catalog?tab=Отели&${queryParams.toString()}`;

    router.push(targetPath);

    setIsSubmitted(false);
  }, [isSubmitted]);

  // Update SearchBlock, URL from hotel data

  useEffect(() => {
    if (hotel) {
      setLocalWhere(hotel.city || '');
      setHotelName?.(hotel.name || '');
      setArrivalCountry?.(hotel.country || '');
    }
  }, [hotel]);

  // Check validity

  useEffect(() => {
    checkFormValidity();
  }, [localCheckInDate, localNights, localGuests, localWhere, localDepartureCity]);

  if (!isClient) return null;

  return (
    <div id='search-tour-search-bar' className='md:flex md:justify-center'>
      <div
        className={`hidden w-full max-w-[1000px] gap-2 rounded-full border-solid bg-white py-1.5 pr-1 shadow-lg md:flex md:h-[64px] md:justify-between lg:h-[78px] lg:max-w-[1180px] lg:gap-4 lg:py-[13px]`}
      >
        {type === 'Туры' && (
          <InputForSearchBlock
            ref={departureRef}
            placeholder='Откуда'
            value={localDepartureCity}
            getValue={setLocalDepartureCity}
            type={type}
            className='border-r-2 border-grey-400 pl-4 md:w-[142px] lg:min-w-[217px] lg:pl-6'
          />
        )}
        <InputForSearchBlock
          ref={whereRef}
          placeholder='Куда'
          type={type}
          value={localWhere}
          getValue={setLocalWhere}
          className={`border-r-2 border-grey-400 md:w-[129px] ${type !== 'Туры' ? 'md:min-w-[176px] md:pl-[16px] lg:min-w-[270px] lg:pl-6' : 'lg:min-w-[194px]'} `}
        />
        <InputDateForSearchBlock
          ref={dateRef}
          placeholder='Когда'
          className={`border-r-2 border-grey-400 ${type !== 'Туры' ? 'md:min-w-[161px] lg:min-w-[246px]' : 'md:w-[125px] lg:min-w-[194px]'} `}
          startValue={localCheckInDate}
          getValue={setLocalCheckInDate}
        />
        <div className='flex items-center align-middle'>
          <SelectForSearchBlock
            ref={nightsRef}
            type='nights'
            className={`border-r-2 border-grey-400 md:w-[130px] ${type !== 'Туры' ? 'md:min-w-[162px] lg:min-w-[247px]' : 'lg:min-w-[193px]'} `}
            startValue={localNights}
            getValue={setLocalNights}
          />
        </div>
        <div className='flex h-full items-center align-middle'>
          <SelectForSearchBlock
            ref={guestsRef}
            type='guests'
            startValue={localGuests}
            getValue={setLocalGuests}
            className={`${type !== 'Туры' ? 'md:w-[160px] lg:min-w-[239px]' : 'md:w-[125px] lg:min-w-[189px]'} `}
          />
        </div>
        <div className='flex items-center align-middle'>
          <ButtonCustom
            id='search-tour-button'
            variant='primary'
            className='text-[18px] md:w-[105px] md:px-[19px] md:py-[12px] lg:w-[110px] lg:px-[28px] lg:py-[20px]'
            size='m'
            onClick={handleSearch}
          >
            <Typography variant='m-bold' className='font-semibold lg:text-[20px]'>
              Найти
            </Typography>
          </ButtonCustom>
        </div>
      </div>
      <div className='container grid w-[100vw] grid-cols-2 gap-x-4 gap-y-[16px] md:hidden'>
        {type === 'Туры' && (
          <InputForSearchBlock
            ref={departureRef}
            placeholder='Откуда'
            value={localDepartureCity}
            getValue={setLocalDepartureCity}
            className='md:text-md col-span-2 h-[50px] max-h-[56px] w-full justify-between rounded-lg bg-white p-4'
          />
        )}
        <InputForSearchBlock
          ref={whereRef}
          placeholder='Куда'
          value={localWhere}
          getValue={setLocalWhere}
          className='md:text-md col-span-2 h-[50px] max-h-[56px] w-full justify-between rounded-lg bg-white p-4'
        />
        <InputDateForSearchBlock
          ref={dateRef}
          placeholder='Когда'
          className='col-span-2 h-[50px] w-full rounded-lg bg-white px-4 md:py-[6px]'
          min={new Date().toISOString().split('T')[0]}
          startValue={localCheckInDate}
          getValue={setLocalCheckInDate}
        />
        <SelectForSearchBlock
          ref={guestsRef}
          type='guests'
          className='h-[50px] w-full rounded-lg bg-white px-[16px] py-[6px] md:h-full'
          startValue={localGuests}
          getValue={setLocalGuests}
        />
        <div className='flex items-center align-middle md:h-full'>
          <SelectForSearchBlock
            ref={nightsRef}
            type='nights'
            className='h-[50px] w-full rounded-lg bg-white px-4 py-[6px]'
            startValue={localNights}
            getValue={setLocalNights}
          />
        </div>
        <div className='col-span-2 mt-2 h-[38px]'>
          <ButtonCustom
            id='search-tour-button'
            variant='primary'
            size='m'
            onClick={handleSearch}
            className='flex h-full w-full items-center justify-center'
          >
            <Typography variant='m-bold' className='font-medium leading-[21px]'>
              Найти
            </Typography>
          </ButtonCustom>
        </div>
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
