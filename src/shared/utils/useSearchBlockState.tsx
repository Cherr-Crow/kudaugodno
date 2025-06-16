// Функция для использования searchBlock/searchTour и обновления данных в URL

import { useEffect, useState } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSearchParams } from 'next/navigation';

import { getNumericValue } from './getNumericValue';
type SearchBlockDefaults = {
  defaultType?: string;
  defaultDepartureCity?: string;
  defaultWhere?: string;
  defaultArrivalCountry?: string;
  defaultHotelName?: string;
  defaultCheckInDate?: string;
  defaultNights?: string;
  defaultGuests?: string;
};

// Функция для получения текста с числом и суффиксом
const formatNumberWithSuffix = (num: string, type: 'guests' | 'nights') => {
  const number = parseInt(num, 10);

  if (type === 'nights') {
    if (number === 1) return '1 ночь';
    if (number >= 2 && number <= 4) return `${number} ночи`;
    return `${number} ночей`;
  }

  if (type === 'guests') {
    if (number === 1) return '1 гость';
    if (number >= 2 && number <= 4) return `${number} гостя`;
    return `${number} гостей`;
  }

  return num; // Возвращаем оригинальное значение, если не найдено
};

export const useSearchBlockState = ({
  defaultType = '',
  defaultDepartureCity = '',
  defaultWhere = '',
  defaultArrivalCountry = '',
  defaultHotelName = '',
  defaultCheckInDate = '',
  defaultNights = 'Количество ночей',
  defaultGuests = 'Количество гостей',
}: SearchBlockDefaults = {}) => {
  const searchParams = useSearchParams();
  // Состояния для формы поиска
  const [type, setType] = useState(defaultType);
  const [departureCity, setDepartureCity] = useState(defaultDepartureCity);
  const [where, setWhere] = useState(defaultWhere);
  const [arrivalCountry, setArrivalCountry] = useState(defaultArrivalCountry);
  const [hotelName, setHotelName] = useState(defaultHotelName);
  const [checkInDate, setCheckInDate] = useState(defaultCheckInDate);
  const [nights, setNights] = useState(defaultNights);
  const [guests, setGuests] = useState(defaultGuests);

  const [isInitialized, setIsInitialized] = useState(false);
  // Загружаем параметры из URL
  useEffect(() => {
    if (searchParams && searchParams.size > 0 && !isInitialized) {
      setType(searchParams.get('type') || defaultType);
      setDepartureCity(searchParams.get('departureCity') || defaultDepartureCity);
      setWhere(searchParams.get('where') || defaultWhere);
      setArrivalCountry(searchParams.get('arrivalCountry') || defaultArrivalCountry);
      setHotelName(searchParams.get('hotelName') || defaultHotelName);
      setCheckInDate(searchParams.get('checkInDate') || defaultCheckInDate);
      setNights(
        formatNumberWithSuffix(
          searchParams.get('nights') || defaultNights,
          'nights',
        ),
      );
      setGuests(
        formatNumberWithSuffix(
          searchParams.get('guests') || defaultGuests,
          'guests',
        ),
      );

      setIsInitialized(true);
    }
  }, [searchParams, isInitialized]);

  // Обновляем URL при изменении полей
  const updateUrlParams = (router: AppRouterInstance, hotelId?: number | null) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (departureCity) params.set('departureCity', departureCity);
    if (where) params.set('where', where);
    if (arrivalCountry) params.set('arrivalCountry', arrivalCountry);
    if (hotelName) params.set('hotelName', hotelName);
    if (checkInDate) params.set('checkInDate', checkInDate);

    const nightsNumber = getNumericValue(nights);
    if (nightsNumber) params.set('nights', nightsNumber);

    const guestsNumber = getNumericValue(guests);
    if (guestsNumber) params.set('guests', guestsNumber);

    if (hotelId) params.set('hotelId', hotelId.toString());

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  return {
    type,
    departureCity,
    where,
    arrivalCountry,
    hotelName,
    checkInDate,
    nights,
    guests,
    setHotelName,
    setDepartureCity,
    setWhere,
    setArrivalCountry,
    setCheckInDate,
    setNights,
    setGuests,
    updateUrlParams,
    isInitialized,
  };
};
