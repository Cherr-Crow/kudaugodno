type DivProps = React.ComponentPropsWithoutRef<'article'>;

export interface IOfferCard extends DivProps {
  offer: IHotelMiniData | ITourMiniData;
}

export interface IHotelMiniData {
  id: number;
  name: string;
  photo: string;
  city: string;
  country: string;
  user_rating: string;
  star_category: number;
  min_price: number;
  distance_to_the_sea?: number;
  distance_to_the_center: number;
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
  min_price: number;
  start_date: string;
  end_date: string;
  // + поле по количеству гостей
}
