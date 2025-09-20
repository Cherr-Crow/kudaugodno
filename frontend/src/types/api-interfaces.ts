import { IHotelMiniData } from './hotel';
import { ITour } from './tour';

export interface IResponceListHotels {
  count: number;
  next: null;
  previous: null;
  results: IHotelMiniData[];
}

export interface IHotelsParamsQuery {
  check_in_date?: string;
  check_out_date?: string;
  guests?: number;
  country?: string;
  city?: string;
  type_of_rest?: string;
  place?: string;
  price_gte?: number;
  price_lte?: number;
  user_rating?: number;
  star_category?: string;
  limit?: number;
  offset?: number;
}

export interface IResponceListTours {
  count: number;
  next: null;
  previous: null;
  results: ITour[];
}

export interface IToursParamsQuery {
  departure_city?: string;
  arrival_city?: string;
  arrival_country?: string;
  start_date?: string;
  nights?: number;
  guests?: number;
  city?: string;
  type_of_rest?: string;
  place?: string;
  price_gte?: number;
  price_lte?: number;
  user_rating?: number;
  star_category?: string;
  distance_to_the_airport?: number;
  tour_operator?: string;
  limit?: number;
  offset?: number;
}
