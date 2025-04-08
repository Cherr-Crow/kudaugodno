import { RoomType } from '@/types/room';

export type rulesType = {
  name: string;
  description: string;
};

export type photoType = {
  id: number;
  photo: string;
  hotel: number;
};

type reviewsType = {
  id: number;
  username: string;
  userPhoto: string;
  date: string;
  rating: number;
  text: string;
};

export type Hotel = {
  id: number;
  name: string;
  star_category: number;
  place: string;
  country: string;
  city: string;
  address: string;
  distance_to_the_station: number | null;
  distance_to_the_sea: number | null;
  distance_to_the_center: number | null;
  distance_to_the_metro: number | null;
  distance_to_the_airport: number | null;
  description: string;
  check_in_time: string;
  check_out_time: string;
  amenities_common: string[];
  amenities_in_the_room: string[];
  amenities_sports_and_recreation: string[];
  amenities_for_children: string[];
  type_of_meals_ultra_all_inclusive: number | null;
  type_of_meals_all_inclusive: number | null;
  type_of_meals_full_board: number | null;
  type_of_meals_half_board: number | null;
  type_of_meals_only_breakfast: number | null;
  user_rating: number;
  type_of_rest: string;
  width: string;
  longitude: string;
  rules: rulesType[];
  is_active: boolean;
  room_categories: string[];
  photo: photoType[];
  rooms: RoomType[];
  reviews: reviewsType[];
};
