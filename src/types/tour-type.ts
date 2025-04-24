export interface ITour {
  hotel_id: number;
  id: number;
  start_date: string;
  end_date: string;
  flight_to: string;
  flight_from: string;
  departure_country: string;
  departure_city: string;
  arrival_country: string;
  arrival_city: string;
  number_of_adults?: number;
  number_of_children?: number;
  tour_operator: string | null;
  hotel: string;
  room: string;
  transfer: boolean;
  price: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// стандартный договор с подчёркиванием вместо персональных данных - загрузка документа
// мед страховка - загрузка документа
// страховка от не выезда - загрузка документа
// бонусы - что это такое и от куда берётся при бронировании и расчёте её стоимости
