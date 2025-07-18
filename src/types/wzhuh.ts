import { IHotelMiniData } from './hotel';
import { ITourMiniData } from './tour';

export interface IWzhuh {
  id: number;
  departure_city: string;
  arrival_city: string;
  photos: IPhoto[];
  description: string;
  best_time_to_travel: string;
  suitable_for_whom: string;
  tours: ITourMiniData[];
  hotels: IHotelMiniData[];
  description_hotel: string;
  description_blog: string;
  is_published: boolean;
}

interface IPhoto {
  photos: string;
}
