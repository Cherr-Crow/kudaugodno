export interface ITour {
  id: number;
  start_date: string;
  end_date: string;
  flight_to: number;
  flight_from: number;
  departure_city: string;
  number_of_adults: number;
  number_of_children: number;
  tour_operator: number;
  hotel: number;
  price: number;
  transfer: string;
  created_at: string;
  document: string;
  updated_at: string;
}
// стандартный договор с подчёркиванием вместо персональных данных - загрузка документа
// мед страховка - загрузка документа
// страховка от не выезда - загрузка документа
// бонусы - что это такое и от куда берётся при бронировании и расчёте её стоимости
