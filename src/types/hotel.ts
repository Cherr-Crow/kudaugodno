import { RoomType } from '@/types/room';

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
  distance_to_the_metro: number | null;
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
  width: string;
  longitude: string;
  rules: rulesType[];
  is_active: boolean;
  photo: photoType[];
  rooms: RoomType[];
};
