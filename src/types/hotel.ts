import { date } from '@/types/date';

export type Hotel = {
  id: number;
  name: string;
  star_category: number;
  place: string;
  country: string;
  city: string;
  address: string;
  distance_to_the_station: number | 0 | null;
  distance_to_the_sea: number;
  distance_to_the_center: number;
  distance_to_the_metro: number;
  distance_to_the_airport: number;
  description: string;
  check_in_time: string;
  check_out_time: string;
  amenities_common: { name: string }[];
  amenities_in_the_room: { name: string }[];
  amenities_sports_and_recreation: { name: string }[];
  amenities_for_children: { name: string }[];
  type_of_meals_ultra_all_inclusive: number | null;
  type_of_meals_all_inclusive: number | null;
  type_of_meals_full_board: number | null;
  type_of_meals_half_board: number | null;
  type_of_meals_only_breakfast: number | null;
  user_rating: number;
  reviews: {
    id: number;
    username: string;
    userPhoto: string;
    date: string;
    rating: number;
    text: string;
  }[];
  photos: {
    id: number;
    photo: string;
    hotel_id: number;
  }[];
  type_of_rest: string;
  rooms: room[];
  dates: date[] | null;
  rules: {
    name: string;
    description: string;
  }[];
};

type room = {
  id: number;
  category: string;
  food_is_a_must: boolean;
  type_of_meal: string;
  rules: {
    smoking: boolean;
    pet: boolean;
  };
  area: number;
  amenities: { name: string }[];
  capacity: number;
  single_bed: number | null;
  double_bed: number | null;
  nightly_price: number;
  photos: {
    id: number;
    photo: string;
    room_id: number;
  }[];
};
