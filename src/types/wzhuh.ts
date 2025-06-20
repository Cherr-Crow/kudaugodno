import { ITourMiniData } from '@/entities/offer-card/OfferCard.types';
import { IHotelMiniData } from '@/entities/offer-card/OfferCard.types';

export interface ITourMiniDataWzhuh extends Omit<ITourMiniData, 'min_price'> {
  sale: null | number;
  price: string;
  number_of_days: number;
}

export interface IHotelMiniDataWzhuh
  extends Omit<IHotelMiniData, 'min_price' | 'distance_to_the_center'> {
  price: string;
}

export interface IWzhuh {
  id: number;
  departure_city: string;
  arrival_city: string;
  photos: IPhoto[];
  description: string;
  best_time_to_travel: string;
  suitable_for_whom: string;
  tours: ITourMiniDataWzhuh[];
  hotels: IHotelMiniDataWzhuh[];
  description_hotel: string;
  description_blog: string;
  is_published: boolean;
}

interface IPhoto {
  photos: string;
}
