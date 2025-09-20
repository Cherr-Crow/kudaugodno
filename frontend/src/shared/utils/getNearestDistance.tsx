import { isHotel } from '@/entities/offer-card/OfferCard';
import { IHotelMiniData } from '@/types/hotel';
import { ITour, ITourMiniData } from '@/types/tour';

import { formatDistance } from './formatDistance';

/**
 * Возвращает объект с двумя минимальными расстояниями до ключевых объектов.
 * @param {object} value - объект отеля или тура.
 * @return {object} объект расстояний с пояснением
 * firstDistance - string
 * secondDistance - string | null - получаем второе значение при необходимости.
 */

export function getNearestDistances(value: IHotelMiniData | ITourMiniData | ITour): {
  firstDistance: string;
  secondDistance: string | null;
} {
  // Извлекаем данные отеля в зависимости от типа объекта
  let hotelData: IHotelMiniData | null = null;

  if ('hotel' in value) {
    // Это ITour объект
    hotelData = value.hotel as unknown as IHotelMiniData;
  } else if (isHotel(value)) {
    // Это IHotelMiniData объект
    hotelData = value;
  } else {
    // Это ITourMiniData или другой неподдерживаемый тип
    return { firstDistance: '', secondDistance: null };
  }

  // Формируем массив расстояний
  const distances = [
    { value: hotelData.distance_to_the_center, text: 'от центра' },
    { value: hotelData.distance_to_the_sea, text: 'от моря' },
    { value: hotelData.distance_to_the_station, text: 'от вокзала' },
    { value: hotelData.distance_to_the_metro, text: 'от метро' },
    { value: hotelData.distance_to_the_airport, text: 'от аэропорта' },
  ];

  // Фильтруем, форматируем и сортируем расстояния
  const validDistances = distances
    .filter((d) => d.value != null && d.value > 0)
    .map((d) => {
      const formatted = formatDistance(d.value!);
      return {
        value: formatted.value,
        unit: formatted.unit,
        text: d.text,
        sortValue: d.value!, // для сортировки
      };
    })
    .sort((a, b) => a.sortValue - b.sortValue); // сортируем по исходным метрам

  if (validDistances.length === 0) {
    return { firstDistance: '', secondDistance: null };
  }

  const first = validDistances[0];
  const second = validDistances.length > 1 ? validDistances[1] : null;

  return {
    firstDistance: `${first.value} ${first.unit} ${first.text}`,
    secondDistance: second ? `${second.value} ${second.unit} ${second.text}` : null,
  };
}
