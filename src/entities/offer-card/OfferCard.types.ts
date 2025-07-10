type DivProps = React.ComponentPropsWithoutRef<'article'>;

export interface IOfferCard extends DivProps {
  offer: IHotelMiniData | ITourMiniData;
  needHotelBadges?: boolean;
}

export interface IHotelMiniData {
  id: number;
  name: string;
  photo: string;
  city: string;
  country: string;
  user_rating: string;
  star_category: number;
  original_price: number;
  discount: number | null;
  discountedPrice: number;
  distance_to_the_sea?: number;
  distance_to_the_center: number;
  nightsCount: number;
  amenities_common: string[];
}

export interface ITourCard extends DivProps {
  tour: ITourMiniData;
}

export interface ITourMiniData {
  id: number;
  name: string;
  photo: string;
  city: string;
  country: string;
  user_rating: number;
  star_category: number;
  original_price: number;
  discount: number | null;
  start_date: string;
  end_date: string;
  arrival_country: string;
  discountedPrice: number;
  nightsCount: number;
}
