import { IFlight } from './flight';
import { IHotel, photoType } from './hotel';
import { MealType, RoomType } from './room';

export interface ITour {
  id: number;
  start_date: string;
  end_date: string;
  flight_to: IFlight;
  flight_from: IFlight;
  departure_country: string;
  departure_city: string;
  arrival_country: string;
  arrival_city: string;
  tour_operator: string | null;
  hotel: Omit<IHotel, 'rooms'>;
  rooms: RoomType[];
  type_of_meals: MealType[];
  total_price: string;
  transfer: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  discount_amount: string;
  discount_start_date: string;
  discount_end_date: string;
  markup_amount: string;
  publish_start_date: string;
  publish_end_date: string;
}
export interface ITourMiniData {
  id: number;
  name: string;
  photo: photoType[];
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
