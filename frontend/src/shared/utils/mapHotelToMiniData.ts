import { IHotelMiniData } from '@/types/hotel';
import { IHotel } from '@/types/hotel';
import { RoomType } from '@/types/room';

const calcDiscount = (priceRaw: number, shareRaw: number) => {
  const price = +priceRaw;
  const share = Math.abs(+shareRaw);

  const discountedPrice =
    share < 1 ? Math.floor(price * (1 - share)) : Math.max(0, price - share);

  const discount = share < 1 ? Math.round(share * 100) : share;

  return { discountedPrice, discount };
};

export const mapHotelToMiniData = (hotel: IHotel): IHotelMiniData | null => {
  let bestOriginal = Infinity;
  let bestDiscounted = Infinity;
  // let bestDiscount: number | null = null;
  let bestRoom: RoomType | null = null;

  hotel.rooms?.forEach((room) => {
    room.calendar_dates?.forEach((d) => {
      if (!d.available_for_booking || !d.discount || d.discount_amount == null)
        return;

      const price = +d.price;
      const { discountedPrice } = calcDiscount(price, +d.discount_amount);

      if (discountedPrice < bestDiscounted) {
        bestDiscounted = discountedPrice;
        bestOriginal = price;
        // bestDiscount = discount;
        bestRoom = room;
      }
    });
  });
  bestRoom = hotel.rooms[0];

  if (!isFinite(bestDiscounted) || !bestRoom) return null;

  return {
    id: hotel.id,
    name: hotel.name,
    country: hotel.country,
    city: hotel.city,
    photo: hotel.photo ?? '',
    star_category: hotel.star_category ?? 0,
    user_rating: hotel.user_rating ?? 0,
    distance_to_the_center: hotel.distance_to_the_center ?? null,
    distance_to_the_sea: hotel.distance_to_the_sea ?? null,
    amenities_common: bestRoom?.amenities_common ?? [],
    min_price_without_discount: String(bestOriginal),
    min_price_with_discount: '',
    distance_to_the_station: hotel.distance_to_the_station ?? null,
    distance_to_the_metro: hotel.distance_to_the_metro ?? null,
    distance_to_the_airport: hotel.distance_to_the_airport ?? null,
    width: hotel.width,
    longitude: hotel.longitude,
    nights: 7,
    guests: 2,
    // discountedPrice: bestDiscounted,
    // discount: bestDiscount,
    // nightsCount: 0,
  };
};
