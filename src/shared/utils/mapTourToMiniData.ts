import { ITourMiniData } from '@/entities/offer-card/OfferCard.types';
import { ITour } from '@/types/tour';

export type EnrichedTourMini = ITourMiniData & {
  discount: number | null;
  discountedPrice: number;
  arrival_country: string;
  nightsCount: number;
};

export function mapTourToMiniData(
  tour: ITour,
  discountRaw: number | null,
): EnrichedTourMini {
  let discountedPrice = tour.price;

  if (discountRaw !== null) {
    if (discountRaw > -1 && discountRaw < 1) {
      discountedPrice = Math.floor(tour.price * (1 - discountRaw));
    } else {
      discountedPrice = Math.max(0, tour.price - discountRaw);
    }
  }

  const firstPhoto =
    Array.isArray(tour.hotel.photo) && tour.hotel.photo.length
      ? tour.hotel.photo[0].photo
      : '';

  const nightsCount = Math.max(
    1,
    Math.ceil(
      (new Date(tour.end_date).getTime() - new Date(tour.start_date).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  return {
    id: tour.id,
    name: tour.hotel.name,
    photo: firstPhoto,
    city: tour.arrival_city,
    country: tour.arrival_country,
    arrival_country: tour.arrival_country,
    user_rating: Math.round(tour.hotel.user_rating ?? 0),
    star_category: tour.hotel.star_category ?? 0,
    original_price: tour.price,
    start_date: tour.start_date,
    end_date: tour.end_date,

    discount: discountRaw,
    discountedPrice,
    nightsCount,
  };
}
