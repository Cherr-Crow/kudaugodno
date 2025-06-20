import {
  ITourMiniData,
  IHotelMiniData,
} from '@/entities/offer-card/OfferCard.types';
import { ITourMiniDataWzhuh, IHotelMiniDataWzhuh } from '@/types/wzhuh';

export const adaptTourWzhuhToMiniData = (
  data: ITourMiniDataWzhuh,
): ITourMiniData => ({
  id: data.id,
  name: data.name,
  photo: data.photo,
  city: data.city,
  country: data.country,
  user_rating: data.user_rating,
  star_category: data.star_category,
  min_price: Number(data.price),
  discount: data.sale,
  start_date: data.start_date,
  end_date: data.end_date,
});

export const adaptHotelWzhuhToMiniData = (
  data: IHotelMiniDataWzhuh,
): IHotelMiniData => ({
  id: data.id,
  name: data.name,
  photo: data.photo,
  city: data.city,
  country: data.country,
  user_rating: String(data.user_rating),
  star_category: data.star_category,
  min_price: Number(data.price),
  distance_to_the_center: 0,
});
