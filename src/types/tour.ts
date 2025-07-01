import { IFlight } from './flight';
import { IHotel } from './hotel';
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
  price: number;
  transfer: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// стандартный договор с подчёркиванием вместо персональных данных - загрузка документа
// мед страховка - загрузка документа
// страховка от не выезда - загрузка документа
// бонусы - что это такое и от куда берётся при бронировании и расчёте её стоимости
