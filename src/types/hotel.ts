import { RoomType } from '@/types/room';

export type IHotel = {
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
  // distance_to_the_metro: number | null;
  distance_to_the_airport: number | null;
  description: string;
  check_in_time: string;
  check_out_time: string;
  amenities_common: string[];
  amenities_in_the_room: string[];
  amenities_sports_and_recreation: string[];
  amenities_for_children: string[];
  user_rating: number;
  type_of_rest: string;
  width: number;
  longitude: number;
  rules: HotelRuleType[];
  is_active: boolean;
  photo: photoType[];
  rooms: RoomType[];
};

type HotelRuleType = {
  name: string;
  description: string;
};

export interface IHotelMiniData {
  id: number;
  country: string;
  city: string;
  distance_to_the_station: number | null;
  distance_to_the_sea: number | null;
  distance_to_the_center: number | null;
  distance_to_the_metro: number | null;
  distance_to_the_airport: number | null;
  star_category: number;
  amenities_common: string[];
  name: string;
  user_rating: number;
  width: number;
  longitude: number;
  photo: photoType[];
  nights: number;
  guests: number;
  min_price_with_discount: string;
  min_price_without_discount: string;
}

export type rulesType = {
  name: string;
  description: string;
};

export type photoType = {
  id: number;
  photo: string;
  hotel?: number;
  room?: number;
};

// type reviewsType = {
//   id: number;
//   username: string;
//   userPhoto: string;
//   date: string;
//   rating: number;
//   text: string;
// };
