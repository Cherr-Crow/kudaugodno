import { IHotelMiniData } from '@/types/hotel';
import { ITourMiniData } from '@/types/tour';

export function getOfferUrl(offer: IHotelMiniData | ITourMiniData): string {
  const isHotel = 'distance_to_the_center' in offer;
  const isTour = 'start_date' in offer;

  const base = isHotel ? '/hotel-page' : '/tour-page';

  const query = new URLSearchParams({
    type: isHotel ? 'Отели' : 'Туры',
    where: offer.city,
    arrivalCountry: offer.country,
    hotelName: offer.name,
    checkInDate: isTour ? (offer as ITourMiniData).start_date : '2025-06-25',
    guests: '2',
    hotelId: offer.id.toString(),
  });

  return `${base}?${query.toString()}`;
}
