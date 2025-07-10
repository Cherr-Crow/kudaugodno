import { IHotelMiniData } from '@/entities/offer-card/OfferCard.types';
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
  let bestDiscount: number | null = null;
  let bestRoom: RoomType | null = null;

  hotel.rooms?.forEach((room) => {
    room.calendar_dates?.forEach((d) => {
      if (!d.available_for_booking || !d.discount || d.discount_amount == null)
        return;

      const price = +d.price;
      const { discountedPrice, discount } = calcDiscount(price, +d.discount_amount);

      if (discountedPrice < bestDiscounted) {
        bestDiscounted = discountedPrice;
        bestOriginal = price;
        bestDiscount = discount;
        bestRoom = room;
      }
    });
  });

  if (!isFinite(bestDiscounted) || !bestRoom) return null;

  return {
    id: hotel.id,
    name: hotel.name,
    country: hotel.country,
    city: hotel.city,
    photo: hotel.photo?.[0]?.photo ?? '',
    star_category: hotel.star_category ?? 0,
    user_rating: hotel.user_rating?.toString() ?? '0',
    distance_to_the_center: hotel.distance_to_the_center ?? 0,
    distance_to_the_sea: hotel.distance_to_the_sea ?? undefined,
    amenities_common: bestRoom?.amenities_common ?? [],
    original_price: bestOriginal,
    discountedPrice: bestDiscounted,
    discount: bestDiscount,
    nightsCount: 0,
  };
};
