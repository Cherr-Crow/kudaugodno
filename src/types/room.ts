/* eslint-disable no-commented-code/no-commented-code */
export type RoomType = {
  id: number;
  category: string;
  // type_of_meals: MealType[];
  number_of_adults: number;
  number_of_children: number;
  single_bed: number | null;
  double_bed: number | null;
  area: number;
  quantity_rooms: number;
  amenities_common: string[];
  amenities_coffee: string[];
  amenities_bathroom: string[];
  amenities_view: string[];
  rules: RulesType[];
  photo: photoType[];
  calendar_dates: AvailableDates[];
  total_price_without_discount?: string;
  total_price_with_discount?: string;
};

type photoType = {
  id: number;
  photo: string;
  room: number;
};

export type MealType = {
  id: number;
  name: string;
  price: string;
};

type RulesType = {
  name: string;
  option: boolean;
};

type AvailableDates = {
  id: number;
  start_date: string;
  end_date: string;
  available_for_booking: boolean;
  discount: boolean; // акция
  discount_amount: string | null; // величина акции, если значение < 1, то это проценты, если > 1, то абсолютное значение скидки
  price: string;
};
