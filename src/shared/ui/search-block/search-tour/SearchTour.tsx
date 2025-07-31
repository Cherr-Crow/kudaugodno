'use client';
import { useEffect, useState } from 'react';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errModal, setErrModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Локальное состояние
  const [localDepartureCity, setLocalDepartureCity] = useState(departureCity);
  const [localWhere, setLocalWhere] = useState(where);
  const [localCheckInDate, setLocalCheckInDate] = useState(checkInDate);
  const [localNights, setLocalNights] = useState(nights);
  const [localGuests, setLocalGuests] = useState(guests);

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

  // Handle search button

  const handleSearch = () => {
    const isValid = checkFormValidity();

    if (!isValid) {
      setErrorMessage('Пожалуйста, заполните все поля формы');
      setErrModal(true);
      return;
    }

    setErrorMessage('');
    setErrModal(false);

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
        ? `/catalog?tab=Туры?${queryParams.toString()}`
        : `/catalog?tab=Отели?${queryParams.toString()}`;

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
    <div className='md:flex md:w-full md:justify-center'>
      <div
        className={`hidden w-full max-w-[1000px] gap-2 rounded-full border-solid bg-white py-3 pr-1 shadow-lg md:flex md:h-[64px] md:justify-between lg:h-[80px] lg:max-w-[1180px] lg:py-5`}
      >
        {type === 'Туры' && (
          <InputForSearchBlock
            placeholder='Откуда'
            value={localDepartureCity}
            getValue={setLocalDepartureCity}
            type={type}
            className='border-r-2 border-grey-400 pl-6 md:w-[154px] md:min-w-[154px] lg:min-w-[252px] lg:pl-12'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          type={type}
          value={localWhere}
          getValue={setLocalWhere}
          className={`border-r-2 border-grey-400 md:w-[130px] lg:pl-1 ${type !== 'Туры' ? 'pl-6 md:min-w-[181px] lg:min-w-[291px] lg:pl-12' : 'lg:pl-2'} md:min-w-[130px] lg:min-w-[212px]`}
        />
        <InputDateForSearchBlock
          placeholder='Когда'
          className={`border-r-2 border-grey-400 md:w-[137px] lg:pl-1 ${type !== 'Туры' ? 'md:w-[185px] md:min-w-[130px] lg:min-w-[254px] lg:pl-2' : 'md:pl-1 lg:pl-2'} md:min-w-[135px] lg:w-[218px] lg:min-w-[212px]`}
          startValue={localCheckInDate}
          getValue={setLocalCheckInDate}
        />
        <div className='flex items-center align-middle'>
          <SelectForSearchBlock
            type='nights'
            className={`border-r-2 border-grey-400 md:w-[122px] ${type !== 'Туры' ? 'md:w-[158px] md:min-w-[160px] lg:min-w-[244px] lg:pl-1' : 'md:pl-1 lg:pl-2'} md:min-w-[120px] lg:min-w-[180px]`}
            startValue={localNights}
            getValue={setLocalNights}
          />
        </div>
        <div className='flex h-full items-center align-middle'>
          <SelectForSearchBlock
            type='guests'
            startValue={localGuests}
            getValue={setLocalGuests}
            className={`md:w-[108px] lg:pl-2 ${type !== 'Туры' ? 'md:w-[158px] md:pl-3 lg:w-[240px] lg:min-w-[238px]' : 'md:pl-1 lg:pl-2'} md:w-[115px] lg:w-[188px] lg:max-w-[170px]`}
          />
        </div>
        <div className='flex items-center align-middle'>
          <ButtonCustom
            variant='primary'
            className='w-full md:px-[28px] md:py-[12px] lg:py-[20px]'
            size='m'
            onClick={handleSearch}
          >
            <Typography
              variant='m-bold'
              className='text-[16px] font-semibold lg:text-[20px]'
            >
              Найти
            </Typography>
          </ButtonCustom>
        </div>
      </div>
      <div className='container grid w-[100vw] grid-cols-2 gap-x-4 gap-y-[12px] md:hidden'>
        {type === 'Туры' && (
          <InputForSearchBlock
            placeholder='Город вылета'
            value={localDepartureCity}
            getValue={setLocalDepartureCity}
            className='md:text-md col-span-2 h-[56px] max-h-[56px] w-full justify-between rounded-lg bg-white p-4'
          />
        )}
        <InputForSearchBlock
          placeholder='Куда'
          value={localWhere}
          getValue={setLocalWhere}
          className='md:text-md col-span-2 h-[56px] max-h-[56px] w-full justify-between rounded-lg bg-white p-4'
        />
        <SelectForSearchBlock
          type='guests'
          className='col-span-2 h-14 w-full rounded-lg bg-white px-4 py-[6px]'
          startValue={localGuests}
          getValue={setLocalGuests}
        />
        <InputDateForSearchBlock
          placeholder='Когда'
          className='h-full w-full rounded-lg bg-white px-[16px] py-[6px] md:h-full'
          min={new Date().toISOString().split('T')[0]}
          startValue={localCheckInDate}
          getValue={setLocalCheckInDate}
        />
        <div className='flex items-center align-middle md:h-full'>
          <SelectForSearchBlock
            type='nights'
            className='h-full w-full rounded-lg bg-white px-4 py-[6px]'
            startValue={localNights}
            getValue={setLocalNights}
          />
        </div>
        <div className='col-span-2 mt-1 h-[44px]'>
          <ButtonCustom
            variant='primary'
            size='m'
            onClick={handleSearch}
            className='flex h-full w-full items-center justify-center'
          >
            <Typography variant='m-bold' className='font-medium'>
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
