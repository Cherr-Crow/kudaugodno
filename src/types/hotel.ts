import { room } from '@/types/room';
import { date } from '@/types/date';

export type Hotel = {
  id: number;
  name: string;
  star_category: number;
  place: string;
  country: string;
  city: string;
  address: string;
  distances: { location: string; distance: number }[];
  description: string;
  check_in_time: string;
  check_out_time: string;
  amenities: {
    id: number;
    name: string;
  }[];
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
  }[];
  type_of_rest: string;
  rooms: room[];
  dates: date[] | null;
};
