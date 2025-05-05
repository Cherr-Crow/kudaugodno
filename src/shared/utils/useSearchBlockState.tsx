// Функция для использования searchBlock/searchTour и обновления данных в URL

import { useEffect, useState } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSearchParams } from 'next/navigation';
type SearchBlockDefaults = {
  defaultDepartureCity?: string;
  defaultWhere?: string;
  defaultCheckInDate?: string;
  defaultCheckOutDate?: string;
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

const getNumericValue = (str: string): string | null => {
  const match = str.match(/\d+/);
  return match ? match[0] : null;
};

export const useSearchBlockState = ({
  defaultDepartureCity = '',
  defaultWhere = '',
  defaultCheckInDate = '',
  defaultCheckOutDate = '',
  defaultNights = 'Количество ночей',
  defaultGuests = 'Количество гостей',
}: SearchBlockDefaults = {}) => {
  const searchParams = useSearchParams();
  // Состояния для формы поиска
  const [departureCity, setDepartureCity] = useState(defaultDepartureCity);
  const [where, setWhere] = useState(defaultWhere);
  const [checkInDate, setCheckInDate] = useState(defaultCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(defaultCheckOutDate);
  const [nights, setNights] = useState(defaultNights);
  const [guests, setGuests] = useState(defaultGuests);
  const [isInitialized, setIsInitialized] = useState(false);
  // Загружаем параметры из URL
  useEffect(() => {
    if (searchParams && searchParams.size > 0 && !isInitialized) {
      setDepartureCity(searchParams.get('departureCity') || defaultDepartureCity);
      setWhere(searchParams.get('where') || defaultWhere);
      setCheckInDate(searchParams.get('checkInDate') || defaultCheckInDate);
      setCheckOutDate(searchParams.get('checkOutDate') || defaultCheckOutDate);
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
    if (departureCity) params.set('departureCity', departureCity);
    if (where) params.set('where', where);
    if (checkInDate) params.set('checkInDate', checkInDate);
    if (checkOutDate) params.set('checkOutDate', checkOutDate);

    const nightsNumber = getNumericValue(nights);
    if (nightsNumber) params.set('nights', nightsNumber);

    const guestsNumber = getNumericValue(guests);
    if (guestsNumber) params.set('guests', guestsNumber);

    if (hotelId) params.set('hotelId', hotelId.toString());

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  return {
    departureCity,
    where,
    checkInDate,
    checkOutDate,
    nights,
    guests,
    setDepartureCity,
    setWhere,
    setCheckInDate,
    setCheckOutDate,
    setNights,
    setGuests,
    updateUrlParams,
    isInitialized,
  };
};
